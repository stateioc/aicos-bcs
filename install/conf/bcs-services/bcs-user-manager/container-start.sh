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

module="bcs-user-manager"

cd /data/bcs/${module}
chmod +x ${module}

#check configuration render
if [ "x$BCS_CONFIG_TYPE" == "xrender" ]; then
  cat ${module}.json.template | \
# set default value
bcsTokenNotifyDryRun=${bcsTokenNotifyRtxTitle:-false} \
bcsTokenNotifyCron="${bcsTokenNotifyCron:-0 10 * * *}" \
bcsTokenNotifyTitle="${bcsTokenNotifyTitle:-TKEx(蓝鲸容器平台) API 密钥续期提醒}" \
bcsTokenNotifyContent="${bcsTokenNotifyContent:-你好，{{ .Username \}\}:<br>您的 API 密钥过期时间为: {{ .ExpiredAt \}\}，如有需要请前往 API 密钥页面及时续期。}" \
bcsTokenNotifyESBEmailPath="${bcsTokenNotifyESBEmailPath:-/api/c/compapi/v2/cmsi/send_mail/}" \
bcsTokenNotifyESBRtxPath="${bcsTokenNotifyESBRtxPath:-/api/c/compapi/v2/cmsi/send_rtx/}" \
enableTokenSync="${enableTokenSync:-false}" \
envsubst | tee ${module}.json
fi

#ready to start
exec /data/bcs/${module}/${module} $@
