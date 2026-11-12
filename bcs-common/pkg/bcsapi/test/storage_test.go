/*
 * SPACE-AICOS is pleased to support the open source community by making
 * SPACE-AICOS available.
 * Copyright (C) 2026 China Academy of Information and Communications Technology (CAICT).
 * All rights reserved.
 * Licensed under the MIT License (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://opensource.org/licenses/MIT
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

package test

import (
	"github.com/Tencent/bk-bcs/bcs-common/common/ssl"
	"github.com/Tencent/bk-bcs/bcs-common/pkg/bcsapi"
	"github.com/Tencent/bk-bcs/bcs-common/pkg/bcsapi/storage"
	restclient "github.com/Tencent/bk-bcs/bcs-common/pkg/esb/client"
	"github.com/Tencent/bk-bcs/bcs-common/pkg/registry"
	"os"
	"testing"
)

func getStorageCli() bcsapi.Storage {
	return bcsapi.NewClient(&bcsapi.Config{
		Hosts:     []string{os.Getenv("TEST_BCS_API_HOST")},
		AuthToken: os.Getenv("TEST_BCS_API_AUTH_TOKEN"),
		Gateway:   true,
	}).Storage()
}

func TestStorageCli_QueryK8SGameDeployment(t *testing.T) {
	tlsconfig, err := ssl.ClientTslConfVerity(
		"xxx",
		"xxx",
		"xxx",
		"xxx")

	if err != nil {
		t.Errorf("ssl.ClientTslConfVerity err: %v", err)
	}

	config := &bcsapi.Config{
		Hosts:     []string{"xxx:xxx"},
		TLSConfig: tlsconfig,
		Gateway:   true,
	}

	client := bcsapi.NewClient(config)
	s := client.Storage()
	mesosNamespaces, err := s.QueryMesosNamespace("xxx")
	if err != nil {
		return
	}
	t.Logf("mesosNamespaces : %v", mesosNamespaces)

	for _, ns := range mesosNamespaces {
		t.Log(ns)
	}
}

func TestStorageCli_QueryK8SNamespace(t *testing.T) {
	type fields struct {
		Config   *bcsapi.Config
		Client   *restclient.RESTClient
		discover registry.Registry
	}
	type args struct {
		cluster   string
		namespace []string
	}
	tests := []struct {
		name    string
		fields  fields
		args    args
		want    []*storage.Namespace
		wantErr bool
	}{
		{
			name: "test",
			args: args{
				cluster: "xxx",
			},
			wantErr: false,
		},
		{
			name: "test",
			args: args{
				cluster:   "xxx",
				namespace: []string{"xxx"},
			},
			wantErr: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			c := getStorageCli()
			got, err := c.QueryK8SNamespace(tt.args.cluster, tt.args.namespace...)
			if (err != nil) != tt.wantErr {
				t.Errorf("QueryK8SNamespace() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			t.Logf("got: %v", got)
		})
	}
}

func TestStorageCli_ListCustomResource(t *testing.T) {
	type fields struct {
		Config   *bcsapi.Config
		Client   *restclient.RESTClient
		discover registry.Registry
	}
	type args struct {
		resourceType string
		filter       map[string]string
		dest         interface{}
	}
	tests := []struct {
		name    string
		fields  fields
		args    args
		want    []*storage.Namespace
		wantErr bool
	}{
		{
			name: "test",
			args: args{
				resourceType: "Namespace",
				filter: map[string]string{
					"data.metadata.name": "xxx",
				},
			},
			wantErr: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			c := getStorageCli()
			err := c.ListCustomResource(tt.args.resourceType, tt.args.filter, tt.args.dest)
			if (err != nil) != tt.wantErr {
				t.Errorf("ListCustomResource() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			t.Logf("got: %v", tt.args.dest)
		})
	}
}
