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

export interface IStyleStack {
  backgroundColor: string[];
  foregroundColor: string[];
  boldDim: string[];
}

export interface IStyleState {
  italic: boolean;
  underline: boolean;
  inverse: boolean;
  hidden: boolean;
  strikethrough: boolean;
}

export interface IDictionary {
  [prop: string]: string;
}

export interface IAnsiConfig {
  ansiTags: IDictionary; // tag配置
  decorators: IDictionary;
}

export interface IStyle {
  italic?: boolean;
  underline?: boolean;
  inverse?: boolean;
  hidden?: boolean;
  strikethrough?: boolean;
  dim?: boolean;
  bold?: boolean;
  backgroundColor?: string;
  foregroundColor?: string;
}

export interface IChunk {
  type: ChunkType;
  value: string;
  style?: IStyle;
}

export interface IParseResult {
  log: string;
  plainText: string;
  chunks: IChunk[];
}

export type ChunkType = 'text' | 'ansi' | 'newline';

export interface IMeta {
  foregroundColor: string;
  html: string;
  plainText: string;
  firstForegroundColor: string;
}
