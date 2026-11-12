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

const crypto = require('crypto');
const fs = require('fs')

// 生成一个随机的Buffer
const randomBuffer = crypto.randomBytes(256);

// 创建一个哈希算法实例，比如SHA-256
const hash = crypto.createHash('sha256');

// 使用随机Buffer更新哈希值
hash.update(randomBuffer);

// 计算哈希值，输出为16进制字符串
const hashDigest = hash.digest('hex');

fs.writeFileSync('./static/static_version.txt',hashDigest)

