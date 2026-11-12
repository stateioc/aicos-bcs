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

  resource.customizations.health.tkex.tencent.com_ImageLoader: |
    hs = {}
    if obj.status ~= nil then
      if obj.status.observedGeneration == nil then
        hs.status = "Progressing"
        hs.message = "Waiting for ImageLoader to finish: observed generation is empty"
        return hs
      end
      if obj.status.observedGeneration < obj.metadata.generation then
        hs.status = "Progressing"
        hs.message = "Waiting for ImageLoader to finish: observed generation less than desired generation"
        return hs
      end
      
      if obj.status.desired ~= nil then
        if obj.status.completed ~= nil then
          if obj.status.desired ~= obj.status.completed then
            hs.status = "Progressing"
            hs.message = "Waiting for ImageLoader to finish: job is running"
            return hs
          end
        end
      end

      if obj.status.desired ~= nil then
        if obj.status.succeeded ~= nil then
          if obj.status.desired == obj.status.succeeded then
            hs.status = "Healthy"
            return hs
          end
        end
      end
      
      if obj.status.failedStatuses ~= nil then
        if next(obj.status.failedStatuses) ~= nil then
          hs.status = "Degraded"
          hs.message = "ImageLoader failed: please check the failedStatuses"
          return hs
        end
      end
    end

    hs.status = "Progressing"
    hs.message = "Waiting for ImageLoader"
    return hs