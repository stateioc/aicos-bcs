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

set -e

echo "Updating ${GOPATH}"

to_fix=$(ls "${GOPATH}/src/k8s.io/kubernetes/staging/src/k8s.io")
for item in $to_fix; do
   echo "Updating staging dep ${item}"
   rm -rf "${GOPATH}/src/k8s.io/${item}"
   mkdir "${GOPATH}/src/k8s.io/${item}"
   cd "${GOPATH}/src/k8s.io/${item}"
   git init
   # shellcheck disable=SC2086
   cp -R ${GOPATH}/src/k8s.io/kubernetes/staging/src/k8s.io/${item}/* ./
   git add .
   git commit -a -m from_staging
done

with_vendor=$(find "${GOPATH}/src/" -type d | grep vendor | grep -v 'vendor/')
for item in $with_vendor; do
    echo "Removing vendor from ${item}"
    (cd "$item")
    rm -rf "$item"
    git commit -a -m no_vendor
done

echo Overriding AKS API
mkdir -p "${GOPATH}/src/github.com/Azure/azure-sdk-for-go/services/containerservice/mgmt/2018-03-31/containerservice"
# shellcheck disable=SC2086
cp ${GOPATH}/src/github.com/Tencent/bk-bcs/bcs-runtime/bcs-k8s/bcs-component/bcs-cluster-autoscaler/_override/github.com/Azure/azure-sdk-for-go/services/containerservice/mgmt/2018-03-31/containerservice/* "${GOPATH}/src/github.com/Azure/azure-sdk-for-go/services/containerservice/mgmt/2018-03-31/containerservice/"
cd "${GOPATH}/src/github.com/Azure/azure-sdk-for-go/services/containerservice/mgmt/2018-03-31/containerservice"
git add .
git commit -a -m "Api override for AKS"

echo Overriding Azure autorest
# shellcheck disable=SC2086
cp -r ${GOPATH}/src/github.com/Tencent/bk-bcs/bcs-runtime/bcs-k8s/bcs-component/bcs-cluster-autoscaler/_override/github.com/Azure/go-autorest/* "${GOPATH}/src/github.com/Azure/go-autorest/"
cd "${GOPATH}/src/github.com/Azure/go-autorest/"
git add .
git commit -a -m "Api override for autorest"
