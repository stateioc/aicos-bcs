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

export GO111MODULE=on

go mod vendor -e

go install k8s.io/code-generator/cmd/go-to-protobuf
go install k8s.io/code-generator/cmd/go-to-protobuf/protoc-gen-gogo
go install github.com/golang/protobuf/protoc-gen-go@v1.3.2
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc
go install golang.org/x/tools/cmd/goimports@latest
go install github.com/grpc-ecosystem/grpc-gateway/protoc-gen-grpc-gateway@v1.16.0
go install github.com/grpc-ecosystem/grpc-gateway/protoc-gen-swagger@v1.16.0
go install go-micro.dev/v4/cmd/protoc-gen-micro@v4
go install sigs.k8s.io/controller-tools/cmd/controller-gen

echo "dependency install done"