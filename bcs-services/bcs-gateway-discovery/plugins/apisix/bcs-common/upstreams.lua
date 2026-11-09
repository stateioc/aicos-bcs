--
-- SPACE-AICOS is pleased to support the open source community by making
-- SPACE-AICOS available.
-- Copyright (C) 2026 China Academy of Information and Communications Technology (CAICT).
-- All rights reserved.
-- Licensed under the MIT License (the "License");
-- you may not use this file except in compliance with the License.
-- You may obtain a copy of the License at http://opensource.org/licenses/MIT
-- Unless required by applicable law or agreed to in writing,
-- software distributed under the License is distributed on
-- an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
-- either express or implied. See the License for the
-- specific language governing permissions and limitations under the License.
--
local core = require("apisix.core")

_M = {}

-- return upstream itself without etcd packed values, but 
function _M.get_upstream_by_name(resource_id)
    local upstreams = core.config.fetch_created_obj("/upstreams")
    if upstreams and upstreams:get(resource_id) then
        local upstream = upstreams:get(resource_id)
        local tmp_upstream = upstream.value
        tmp_upstream.modifiedIndex = upstream.modifiedIndex
        return tmp_upstream
    end
    
    local services = core.config.fetch_created_obj("/services")
    if services and services:get(resource_id) then
        local service = services:get(resource_id)
        if service.value.upstream then
            local tmp_upstream = service.value.upstream
            tmp_upstream.modifiedIndex = service.modifiedIndex
            return tmp_upstream
        end
    end

    local routes = core.config.fetch_created_obj("/routes")
    if routes and routes:get(resource_id) then
        local route = routes:get(resource_id)
        if route.value.upstream then
            local tmp_upstream = route.value.upstream
            tmp_upstream.modifiedIndex = route.modifiedIndex
            return tmp_upstream
        end
    end
end

return _M
