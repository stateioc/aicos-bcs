#!/bin/bash
#######################################
# SPACE-AICOS is pleased to support the open source community by making
# SPACE-AICOS available.
# Copyright (C) 2026 China Academy of Information and Communications Technology (CAICT).
# All rights reserved.
# Licensed under the MIT License (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at http://opensource.org/licenses/MIT
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on
# an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
# either express or implied. See the License for the
# specific language governing permissions and limitations under the License.
#######################################

#script use for starting necessary module for
# for test, demonstration

echo "begin to start modules $@"
# test modules
for module in $@
do
  echo "checking module $module binary"
  if [ ! -e /data/bcs/$module/$module ]; then 
    echo "lost module $module in /data/bcs"
    exit 1
  fi
  echo "checking module $module binary successfully"
done

#init kong conf & bkbcs-auth
cd /data/bcs/bcs-gateway-discovery
cp -r ./bkbcs-auth /usr/local/share/lua/5.1/kong/plugins/
#kong configuration
cp kong.conf.template /etc/kong/

#ready to start all specified module by 
# using container-start script
for module in $@
do
  echo "starting module $module ... "
  if [ $module == "bcs-kube-agent" ]; then
    cd /data/bcs/bcs-kube-agent
    ./bcs-kube-agent --bke-address=https://127.0.0.1:8443 \
      --cluster-id=BCS-K8S-00000 --insecureSkipVerify=true &
    continue
  fi
  if [ $module == "bcs-k8s-watch" ]; then
    cd /data/bcs/bcs-k8s-watch
    chmod +x container-start.sh
    /data/bcs/bcs-k8s-watch/container-start.sh --config \
      /data/bcs/bcs-k8s-watch/bcs-k8s-watch.json &
    continue
  fi
  cd /data/bcs/$module/
  chmod + container-start.sh
  ./container-start.sh -f $module.json &
done

echo "waiting for signal to exit..."
trap "exit 1" HUP INT PIPE QUIT TERM
