#!/bin/sh
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

set -e

SKIP_DIR="\
bk-bcs/build \
bk-bcs/vendor \
bk-bcs/bcs-services/bcs-storage/storage/drivers/mongodb \
bk-bcs/bcs-services/bcs-metricservice/pkg/zk \
bk-bcs/bcs-common/pkg/scheduler/mesosproto \
bk-bcs/bcs-mesos/bcs-process-executor/process-executor/protobuf \
bk-bcs/bcs-services/bcs-webhook-server/pkg/client \
bk-bcs/bcs-k8s/bcs-k8s-watch/pkg/kubefed/client \
bk-bcs/bcs-k8s/bcs-egress \
bk-bcs/bcs-mesos/bcs-container-executor/mesos \
bk-bcs/bmsf-configuration \
bk-bcs/bcs-services/bcs-project"

PACKAGES=$(go list ../...)
for dir in $SKIP_DIR;do
	PACKAGES=`echo "$PACKAGES" | grep -v "$dir"`
done

# vet:
echo "go vet"
go vet -all $PACKAGES
