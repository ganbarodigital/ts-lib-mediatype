//
// Copyright (c) 2020-present Ganbaro Digital Ltd
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions
// are met:
//
//   * Re-distributions of source code must retain the above copyright
//     notice, this list of conditions and the following disclaimer.
//
//   * Redistributions in binary form must reproduce the above copyright
//     notice, this list of conditions and the following disclaimer in
//     the documentation and/or other materials provided with the
//     distribution.
//
//   * Neither the names of the copyright holders nor the names of his
//     contributors may be used to endorse or promote products derived
//     from this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
// FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
// COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
// INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
// BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
// CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
// LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
// ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.
//
import { ErrorTable, ErrorTableTemplate } from "@ganbarodigital/ts-lib-error-reporting/lib/v1";
import { httpStatusCodeFrom } from "@ganbarodigital/ts-lib-http-types/lib/v1";
import { packageNameFrom } from "@ganbarodigital/ts-lib-packagename/lib/v1";

import { MediaTypeMatchRegexIsBrokenTemplate } from "./MediaTypeMatchRegexIsBroken";
import { NotAContentTypeTemplate } from "./NotAContentType";
import { NotAMediaTypeTemplate } from "./NotAMediaType";
import { UnexpectedContentTypeTemplate } from "./UnexpectedContentType";

const PACKAGE_NAME = packageNameFrom("@ganbarodigital/ts-lib-mediatypes");

type PackageErrorTableIndex<T extends ErrorTable> = ErrorTableTemplate<T, string>;

export class PackageErrorTable implements ErrorTable {
    [key: string]: PackageErrorTableIndex<PackageErrorTable>;

    public "mediatypematchregex-is-broken": MediaTypeMatchRegexIsBrokenTemplate = {
        packageName: PACKAGE_NAME,
        errorName: "mediatypematchregex-is-broken",
        detail: "the MediaTypeMatchRegex no longer returns the expected named groups",
        status: httpStatusCodeFrom(500),
    };

    public "not-a-content-type": NotAContentTypeTemplate = {
        packageName: PACKAGE_NAME,
        errorName: "not-a-content-type",
        detail: "the given string does not have the structure of a ContentType",
        status: httpStatusCodeFrom(422),
    };

    public "not-a-media-type": NotAMediaTypeTemplate = {
        packageName: PACKAGE_NAME,
        errorName: "not-a-media-type",
        detail: "the given string does not have the structure of a MediaType",
        status: httpStatusCodeFrom(422),
    };

    public "unexpected-content-type": UnexpectedContentTypeTemplate = {
        packageName: PACKAGE_NAME,
        errorName: "unexpected-content-type",
        detail: "the given MediaType does not match any of the expected content types",
        status: httpStatusCodeFrom(422),
    };
}

export const ERROR_TABLE = new PackageErrorTable();