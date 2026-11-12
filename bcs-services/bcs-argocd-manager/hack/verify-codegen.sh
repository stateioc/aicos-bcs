#!/usr/bin/env bash
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

set -o errexit
set -o nounset
set -o pipefail

OUTPUT_PKG=pkg/tkex
MODULE=tencent.com/github.com/Tencent/bk-bcs/bcs-services/bcs-argocd-manager

SCRIPT_ROOT=$(dirname "${BASH_SOURCE[0]}")/..

DIFFROOT="${SCRIPT_ROOT}/${OUTPUT_PKG}"
TMP_DIFFROOT="${SCRIPT_ROOT}/_tmp/${OUTPUT_PKG}"
_tmp="${SCRIPT_ROOT}/_tmp"

cleanup() {
  rm -rf "${_tmp}"
}
trap "cleanup" EXIT SIGINT

cleanup

mkdir -p "${TMP_DIFFROOT}"
cp -a "${DIFFROOT}"/* "${TMP_DIFFROOT}"

"${SCRIPT_ROOT}/hack/update-codegen.sh"
echo "copying generated ${SCRIPT_ROOT}/${MODULE}/${OUTPUT_PKG} to ${DIFFROOT}"
cp -r "${SCRIPT_ROOT}/${MODULE}/${OUTPUT_PKG}"/* "${DIFFROOT}"

echo "diffing ${DIFFROOT} against freshly generated codegen"
ret=0
diff -Naupr "${DIFFROOT}" "${TMP_DIFFROOT}" || ret=$?
cp -a "${TMP_DIFFROOT}"/* "${DIFFROOT}"
if [[ $ret -eq 0 ]]
then
  echo "${DIFFROOT} up to date."
else
  echo "${DIFFROOT} is out of date. Please run hack/update-codegen.sh"
  exit 1
fi