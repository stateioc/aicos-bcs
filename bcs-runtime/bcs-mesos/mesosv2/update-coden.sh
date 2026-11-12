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

# rm generated
rm -rf ./generated

# use kubebuilder generate deepcopy code
make generate
# use kubebuilder generate yaml configs
make manifests

# use code-generate generate clientset lister and informer
chmod +x ./vendor/k8s.io/code-generator/generate-groups.sh

# generate the code with:
# --output-base    because this script should also be able to run inside the vendor dir of
#                  k8s.io/kubernetes. The output-base is needed for the generators to output into the vendor dir
#                  instead of the $GOPATH directly. For normal projects this can be dropped.

for dir_group in $(ls ./apis/); do
    for dir_version in $(ls "./apis/$dir_group/"); do
        echo "generate client,informer,lister for $dir_group/$dir_version"
        ./vendor/k8s.io/code-generator/generate-groups.sh \
            "client,informer,lister" \
            github.com/Tencent/bk-bcs/bcs-runtime/bcs-mesos/mesosv2/generated \
            github.com/Tencent/bk-bcs/bcs-runtime/bcs-mesos/mesosv2/apis \
            $dir_group:$dir_version \
            --go-header-file $(pwd)/hack/boilerplate.go.txt 
    done
done

# when GOPATH exsited, code-generator will generate code in gopath
if [ $GOPATH ]; then  
  echo "done"
else  
  echo "cp from current dir"
  cp -r github.com/Tencent/bk-bcs/bcs-runtime/bcs-mesos/mesosv2/generated generated
  rm -rf ./github.com
fi 
