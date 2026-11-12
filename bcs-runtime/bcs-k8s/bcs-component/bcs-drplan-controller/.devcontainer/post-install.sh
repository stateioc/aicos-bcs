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

set -euo pipefail

echo "Installing Kubebuilder development tools..."

ARCH=$(go env GOARCH)

# Install kind
if ! command -v kind &> /dev/null; then
  curl -Lo ./kind "https://kind.sigs.k8s.io/dl/latest/kind-linux-${ARCH}"
  chmod +x ./kind
  mv ./kind /usr/local/bin/kind
fi

# Install kubebuilder
if ! command -v kubebuilder &> /dev/null; then
  curl -L -o kubebuilder "https://go.kubebuilder.io/dl/latest/linux/${ARCH}"
  chmod +x kubebuilder
  mv kubebuilder /usr/local/bin/
fi

# Install kubectl
if ! command -v kubectl &> /dev/null; then
  KUBECTL_VERSION=$(curl -L -s https://dl.k8s.io/release/stable.txt)
  curl -LO "https://dl.k8s.io/release/${KUBECTL_VERSION}/bin/linux/${ARCH}/kubectl"
  chmod +x kubectl
  mv kubectl /usr/local/bin/kubectl
fi

# Wait for Docker to be ready
for i in {1..30}; do
  if docker info >/dev/null 2>&1; then
    break
  fi
  if [ $i -eq 30 ]; then
    echo "WARNING: Docker not ready after 30s"
  fi
  sleep 1
done

# Create kind network, ignore errors if exists or conflicts
docker network inspect kind >/dev/null 2>&1 || docker network create kind || true

# Verify installations
echo "Installed versions:"
kind version
kubebuilder version
kubectl version --client
docker --version
go version

echo "DevContainer ready!"
