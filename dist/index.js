require('./sourcemap-register.js');/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 9306:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

/*
 * Copyright 2020-present, Nike, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 *
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
/* eslint-disable github/array-foreach */
/* eslint-disable github/no-then */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
const core = __importStar(__nccwpck_require__(2186));
const cerberus_node_client_1 = __importDefault(__nccwpck_require__(2073));
class Cerberus {
    constructor(hostUrl, region, debug) {
        core.debug('Creating Cerberus object and connecting to cerberus');
        this.client = new cerberus_node_client_1.default({
            hostUrl,
            region,
            debug
        });
    }
    readToEnv(sdbPath, mapKeyVariable) {
        core.debug(`Reading sdb ${sdbPath}`);
        this.client
            .getSecureData(sdbPath)
            .then(secrets => {
            core.debug(`Received secrets in sdb ${sdbPath}`);
            Object.keys(mapKeyVariable).forEach(requestedKeyname => {
                core.debug(`Looking for ${requestedKeyname}`);
                if (secrets[requestedKeyname]) {
                    core.debug(`Found ${requestedKeyname}`);
                    core.setSecret(secrets[requestedKeyname]);
                    core.exportVariable(mapKeyVariable[requestedKeyname], secrets[requestedKeyname]);
                }
                else {
                    core.warning(`Key ${requestedKeyname} NOT FOUND. Not setting into environment`);
                }
            });
        })
            .catch(ex => {
            core.setFailed(ex.message);
        });
    }
}
exports.default = Cerberus;


/***/ }),

/***/ 3109:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

/*
 * Copyright 2020-present, Nike, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 *
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core = __importStar(__nccwpck_require__(2186));
const cerberus_1 = __importDefault(__nccwpck_require__(9306));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            core.debug('Gathering all inputs');
            const cerberusUrl = core.getInput('cerberusUrl');
            const cerberusRegion = core.getInput('cerberusRegion');
            const sdbPath = core.getInput('sdbPath');
            const sdbEnvVariableMapping = core.getInput('sdbEnvVariableMapping');
            core.info(`Using Cerberus : ${cerberusUrl} in Region ${cerberusRegion}`);
            core.info(`Reading SDB : ${sdbPath}`);
            core.info(`Looking for ${sdbEnvVariableMapping}`);
            core.debug('Converting given sdbEnvVariableMapping to JSON object');
            const mapKeyVariable = JSON.parse(sdbEnvVariableMapping);
            const cerberus = new cerberus_1.default(cerberusUrl, cerberusRegion, true);
            cerberus.readToEnv(sdbPath, mapKeyVariable);
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();


/***/ }),

/***/ 7351:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const os = __importStar(__nccwpck_require__(2087));
const utils_1 = __nccwpck_require__(5278);
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
function escapeData(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 2186:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const command_1 = __nccwpck_require__(7351);
const file_command_1 = __nccwpck_require__(717);
const utils_1 = __nccwpck_require__(5278);
const os = __importStar(__nccwpck_require__(2087));
const path = __importStar(__nccwpck_require__(5622));
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env['GITHUB_ENV'] || '';
    if (filePath) {
        const delimiter = '_GitHubActionsFileCommandDelimeter_';
        const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
        file_command_1.issueCommand('ENV', commandValue);
    }
    else {
        command_1.issueCommand('set-env', { name }, convertedVal);
    }
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    const filePath = process.env['GITHUB_PATH'] || '';
    if (filePath) {
        file_command_1.issueCommand('PATH', inputPath);
    }
    else {
        command_1.issueCommand('add-path', {}, inputPath);
    }
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.  The value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    process.stdout.write(os.EOL);
    command_1.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 */
function error(message) {
    command_1.issue('error', message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds an warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 */
function warning(message) {
    command_1.issue('warning', message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    command_1.issueCommand('save-state', { name }, value);
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 717:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

// For internal use, subject to change.
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar(__nccwpck_require__(5747));
const os = __importStar(__nccwpck_require__(2087));
const utils_1 = __nccwpck_require__(5278);
function issueCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: 'utf8'
    });
}
exports.issueCommand = issueCommand;
//# sourceMappingURL=file-command.js.map

/***/ }),

/***/ 5278:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 7579:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var property_provider_1 = __nccwpck_require__(6772);
exports.ENV_KEY = "AWS_ACCESS_KEY_ID";
exports.ENV_SECRET = "AWS_SECRET_ACCESS_KEY";
exports.ENV_SESSION = "AWS_SESSION_TOKEN";
exports.ENV_EXPIRATION = "AWS_CREDENTIAL_EXPIRATION";
/**
 * Source AWS credentials from known environment variables. If either the
 * `AWS_ACCESS_KEY_ID` or `AWS_SECRET_ACCESS_KEY` environment variable is not
 * set in this process, the provider will return a rejected promise.
 */
function fromEnv() {
    return function () {
        var accessKeyId = process.env[exports.ENV_KEY];
        var secretAccessKey = process.env[exports.ENV_SECRET];
        var expiry = process.env[exports.ENV_EXPIRATION];
        if (accessKeyId && secretAccessKey) {
            return Promise.resolve({
                accessKeyId: accessKeyId,
                secretAccessKey: secretAccessKey,
                sessionToken: process.env[exports.ENV_SESSION],
                expiration: expiry ? new Date(expiry) : undefined
            });
        }
        return Promise.reject(new property_provider_1.ProviderError("Unable to find environment variable credentials."));
    };
}
exports.fromEnv = fromEnv;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLGdFQUEyRDtBQUU5QyxRQUFBLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQztBQUM5QixRQUFBLFVBQVUsR0FBRyx1QkFBdUIsQ0FBQztBQUNyQyxRQUFBLFdBQVcsR0FBRyxtQkFBbUIsQ0FBQztBQUNsQyxRQUFBLGNBQWMsR0FBRywyQkFBMkIsQ0FBQztBQUUxRDs7OztHQUlHO0FBQ0gsU0FBZ0IsT0FBTztJQUNyQixPQUFPO1FBQ0wsSUFBTSxXQUFXLEdBQXVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBTyxDQUFDLENBQUM7UUFDN0QsSUFBTSxlQUFlLEdBQXVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQVUsQ0FBQyxDQUFDO1FBQ3BFLElBQU0sTUFBTSxHQUF1QixPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFjLENBQUMsQ0FBQztRQUMvRCxJQUFJLFdBQVcsSUFBSSxlQUFlLEVBQUU7WUFDbEMsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDO2dCQUNyQixXQUFXLGFBQUE7Z0JBQ1gsZUFBZSxpQkFBQTtnQkFDZixZQUFZLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBVyxDQUFDO2dCQUN0QyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUzthQUNsRCxDQUFDLENBQUM7U0FDSjtRQUVELE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FDbkIsSUFBSSxpQ0FBYSxDQUFDLGtEQUFrRCxDQUFDLENBQ3RFLENBQUM7SUFDSixDQUFDLENBQUM7QUFDSixDQUFDO0FBbEJELDBCQWtCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENyZWRlbnRpYWxQcm92aWRlciB9IGZyb20gXCJAYXdzLXNkay90eXBlc1wiO1xuaW1wb3J0IHsgUHJvdmlkZXJFcnJvciB9IGZyb20gXCJAYXdzLXNkay9wcm9wZXJ0eS1wcm92aWRlclwiO1xuXG5leHBvcnQgY29uc3QgRU5WX0tFWSA9IFwiQVdTX0FDQ0VTU19LRVlfSURcIjtcbmV4cG9ydCBjb25zdCBFTlZfU0VDUkVUID0gXCJBV1NfU0VDUkVUX0FDQ0VTU19LRVlcIjtcbmV4cG9ydCBjb25zdCBFTlZfU0VTU0lPTiA9IFwiQVdTX1NFU1NJT05fVE9LRU5cIjtcbmV4cG9ydCBjb25zdCBFTlZfRVhQSVJBVElPTiA9IFwiQVdTX0NSRURFTlRJQUxfRVhQSVJBVElPTlwiO1xuXG4vKipcbiAqIFNvdXJjZSBBV1MgY3JlZGVudGlhbHMgZnJvbSBrbm93biBlbnZpcm9ubWVudCB2YXJpYWJsZXMuIElmIGVpdGhlciB0aGVcbiAqIGBBV1NfQUNDRVNTX0tFWV9JRGAgb3IgYEFXU19TRUNSRVRfQUNDRVNTX0tFWWAgZW52aXJvbm1lbnQgdmFyaWFibGUgaXMgbm90XG4gKiBzZXQgaW4gdGhpcyBwcm9jZXNzLCB0aGUgcHJvdmlkZXIgd2lsbCByZXR1cm4gYSByZWplY3RlZCBwcm9taXNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZnJvbUVudigpOiBDcmVkZW50aWFsUHJvdmlkZXIge1xuICByZXR1cm4gKCkgPT4ge1xuICAgIGNvbnN0IGFjY2Vzc0tleUlkOiBzdHJpbmcgfCB1bmRlZmluZWQgPSBwcm9jZXNzLmVudltFTlZfS0VZXTtcbiAgICBjb25zdCBzZWNyZXRBY2Nlc3NLZXk6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHByb2Nlc3MuZW52W0VOVl9TRUNSRVRdO1xuICAgIGNvbnN0IGV4cGlyeTogc3RyaW5nIHwgdW5kZWZpbmVkID0gcHJvY2Vzcy5lbnZbRU5WX0VYUElSQVRJT05dO1xuICAgIGlmIChhY2Nlc3NLZXlJZCAmJiBzZWNyZXRBY2Nlc3NLZXkpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoe1xuICAgICAgICBhY2Nlc3NLZXlJZCxcbiAgICAgICAgc2VjcmV0QWNjZXNzS2V5LFxuICAgICAgICBzZXNzaW9uVG9rZW46IHByb2Nlc3MuZW52W0VOVl9TRVNTSU9OXSxcbiAgICAgICAgZXhwaXJhdGlvbjogZXhwaXJ5ID8gbmV3IERhdGUoZXhwaXJ5KSA6IHVuZGVmaW5lZFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFxuICAgICAgbmV3IFByb3ZpZGVyRXJyb3IoXCJVbmFibGUgdG8gZmluZCBlbnZpcm9ubWVudCB2YXJpYWJsZSBjcmVkZW50aWFscy5cIilcbiAgICApO1xuICB9O1xufVxuIl19

/***/ }),

/***/ 6864:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var tslib_1 = __nccwpck_require__(4351);
var RemoteProviderInit_1 = __nccwpck_require__(1568);
var httpGet_1 = __nccwpck_require__(4537);
var ImdsCredentials_1 = __nccwpck_require__(4339);
var retry_1 = __nccwpck_require__(8267);
var property_provider_1 = __nccwpck_require__(6772);
var url_1 = __nccwpck_require__(8835);
exports.ENV_CMDS_FULL_URI = "AWS_CONTAINER_CREDENTIALS_FULL_URI";
exports.ENV_CMDS_RELATIVE_URI = "AWS_CONTAINER_CREDENTIALS_RELATIVE_URI";
exports.ENV_CMDS_AUTH_TOKEN = "AWS_CONTAINER_AUTHORIZATION_TOKEN";
/**
 * Creates a credential provider that will source credentials from the ECS
 * Container Metadata Service
 */
function fromContainerMetadata(init) {
    var _this = this;
    if (init === void 0) { init = {}; }
    var _a = RemoteProviderInit_1.providerConfigFromInit(init), timeout = _a.timeout, maxRetries = _a.maxRetries;
    return function () {
        return getCmdsUri().then(function (url) {
            return retry_1.retry(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var credsResponse, _a, _b;
                return tslib_1.__generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _b = (_a = JSON).parse;
                            return [4 /*yield*/, requestFromEcsImds(timeout, url)];
                        case 1:
                            credsResponse = _b.apply(_a, [_c.sent()]);
                            if (!ImdsCredentials_1.isImdsCredentials(credsResponse)) {
                                throw new property_provider_1.ProviderError("Invalid response received from instance metadata service.");
                            }
                            return [2 /*return*/, ImdsCredentials_1.fromImdsCredentials(credsResponse)];
                    }
                });
            }); }, maxRetries);
        });
    };
}
exports.fromContainerMetadata = fromContainerMetadata;
function requestFromEcsImds(timeout, options) {
    if (process.env[exports.ENV_CMDS_AUTH_TOKEN]) {
        var _a = options.headers, headers = _a === void 0 ? {} : _a;
        headers.Authorization = process.env[exports.ENV_CMDS_AUTH_TOKEN];
        options.headers = headers;
    }
    return httpGet_1.httpGet(tslib_1.__assign(tslib_1.__assign({}, options), { timeout: timeout })).then(function (buffer) { return buffer.toString(); });
}
var CMDS_IP = "169.254.170.2";
var GREENGRASS_HOSTS = {
    localhost: true,
    "127.0.0.1": true
};
var GREENGRASS_PROTOCOLS = {
    "http:": true,
    "https:": true
};
function getCmdsUri() {
    if (process.env[exports.ENV_CMDS_RELATIVE_URI]) {
        return Promise.resolve({
            hostname: CMDS_IP,
            path: process.env[exports.ENV_CMDS_RELATIVE_URI]
        });
    }
    if (process.env[exports.ENV_CMDS_FULL_URI]) {
        var parsed = url_1.parse(process.env[exports.ENV_CMDS_FULL_URI]);
        if (!parsed.hostname || !(parsed.hostname in GREENGRASS_HOSTS)) {
            return Promise.reject(new property_provider_1.ProviderError(parsed.hostname + " is not a valid container metadata service hostname", false));
        }
        if (!parsed.protocol || !(parsed.protocol in GREENGRASS_PROTOCOLS)) {
            return Promise.reject(new property_provider_1.ProviderError(parsed.protocol + " is not a valid container metadata service protocol", false));
        }
        return Promise.resolve(tslib_1.__assign(tslib_1.__assign({}, parsed), { port: parsed.port ? parseInt(parsed.port, 10) : undefined }));
    }
    return Promise.reject(new property_provider_1.ProviderError("The container metadata credential provider cannot be used unless" +
        (" the " + exports.ENV_CMDS_RELATIVE_URI + " or " + exports.ENV_CMDS_FULL_URI + " environment") +
        " variable is set", false));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbUNvbnRhaW5lck1ldGFkYXRhLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiZnJvbUNvbnRhaW5lck1ldGFkYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDBFQUc2QztBQUM3QyxvREFBbUQ7QUFDbkQsb0VBRzBDO0FBQzFDLGdEQUErQztBQUMvQyxnRUFBMkQ7QUFDM0QsMkJBQTRCO0FBR2YsUUFBQSxpQkFBaUIsR0FBRyxvQ0FBb0MsQ0FBQztBQUN6RCxRQUFBLHFCQUFxQixHQUFHLHdDQUF3QyxDQUFDO0FBQ2pFLFFBQUEsbUJBQW1CLEdBQUcsbUNBQW1DLENBQUM7QUFFdkU7OztHQUdHO0FBQ0gsU0FBZ0IscUJBQXFCLENBQ25DLElBQTZCO0lBRC9CLGlCQW9CQztJQW5CQyxxQkFBQSxFQUFBLFNBQTZCO0lBRXZCLElBQUEsc0RBQXNELEVBQXBELG9CQUFPLEVBQUUsMEJBQTJDLENBQUM7SUFDN0QsT0FBTztRQUNMLE9BQU8sVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsR0FBRztZQUMxQixPQUFBLGFBQUssQ0FBQzs7Ozs7NEJBQ2tCLEtBQUEsQ0FBQSxLQUFBLElBQUksQ0FBQSxDQUFDLEtBQUssQ0FBQTs0QkFDOUIscUJBQU0sa0JBQWtCLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxFQUFBOzs0QkFEbEMsYUFBYSxHQUFHLGNBQ3BCLFNBQXNDLEVBQ3ZDOzRCQUNELElBQUksQ0FBQyxtQ0FBaUIsQ0FBQyxhQUFhLENBQUMsRUFBRTtnQ0FDckMsTUFBTSxJQUFJLGlDQUFhLENBQ3JCLDJEQUEyRCxDQUM1RCxDQUFDOzZCQUNIOzRCQUVELHNCQUFPLHFDQUFtQixDQUFDLGFBQWEsQ0FBQyxFQUFDOzs7aUJBQzNDLEVBQUUsVUFBVSxDQUFDO1FBWGQsQ0FXYyxDQUNmLENBQUM7SUFDSixDQUFDLENBQUM7QUFDSixDQUFDO0FBcEJELHNEQW9CQztBQUVELFNBQVMsa0JBQWtCLENBQ3pCLE9BQWUsRUFDZixPQUF1QjtJQUV2QixJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQW1CLENBQUMsRUFBRTtRQUM1QixJQUFBLG9CQUFZLEVBQVosaUNBQVksQ0FBYTtRQUNqQyxPQUFPLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQW1CLENBQUMsQ0FBQztRQUN6RCxPQUFPLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztLQUMzQjtJQUVELE9BQU8saUJBQU8sdUNBQ1QsT0FBTyxLQUNWLE9BQU8sU0FBQSxJQUNQLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFqQixDQUFpQixDQUFDLENBQUM7QUFDdkMsQ0FBQztBQUVELElBQU0sT0FBTyxHQUFHLGVBQWUsQ0FBQztBQUNoQyxJQUFNLGdCQUFnQixHQUFHO0lBQ3ZCLFNBQVMsRUFBRSxJQUFJO0lBQ2YsV0FBVyxFQUFFLElBQUk7Q0FDbEIsQ0FBQztBQUNGLElBQU0sb0JBQW9CLEdBQUc7SUFDM0IsT0FBTyxFQUFFLElBQUk7SUFDYixRQUFRLEVBQUUsSUFBSTtDQUNmLENBQUM7QUFFRixTQUFTLFVBQVU7SUFDakIsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLDZCQUFxQixDQUFDLEVBQUU7UUFDdEMsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDO1lBQ3JCLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLDZCQUFxQixDQUFDO1NBQ3pDLENBQUMsQ0FBQztLQUNKO0lBRUQsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUFpQixDQUFDLEVBQUU7UUFDbEMsSUFBTSxNQUFNLEdBQUcsV0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQWlCLENBQUUsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLGdCQUFnQixDQUFDLEVBQUU7WUFDOUQsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUNuQixJQUFJLGlDQUFhLENBQ1osTUFBTSxDQUFDLFFBQVEsd0RBQXFELEVBQ3ZFLEtBQUssQ0FDTixDQUNGLENBQUM7U0FDSDtRQUVELElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLG9CQUFvQixDQUFDLEVBQUU7WUFDbEUsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUNuQixJQUFJLGlDQUFhLENBQ1osTUFBTSxDQUFDLFFBQVEsd0RBQXFELEVBQ3ZFLEtBQUssQ0FDTixDQUNGLENBQUM7U0FDSDtRQUVELE9BQU8sT0FBTyxDQUFDLE9BQU8sdUNBQ2pCLE1BQU0sS0FDVCxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsSUFDekQsQ0FBQztLQUNKO0lBRUQsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUNuQixJQUFJLGlDQUFhLENBQ2Ysa0VBQWtFO1NBQ2hFLFVBQVEsNkJBQXFCLFlBQU8seUJBQWlCLGlCQUFjLENBQUE7UUFDbkUsa0JBQWtCLEVBQ3BCLEtBQUssQ0FDTixDQUNGLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ3JlZGVudGlhbFByb3ZpZGVyIH0gZnJvbSBcIkBhd3Mtc2RrL3R5cGVzXCI7XG5pbXBvcnQge1xuICBSZW1vdGVQcm92aWRlckluaXQsXG4gIHByb3ZpZGVyQ29uZmlnRnJvbUluaXRcbn0gZnJvbSBcIi4vcmVtb3RlUHJvdmlkZXIvUmVtb3RlUHJvdmlkZXJJbml0XCI7XG5pbXBvcnQgeyBodHRwR2V0IH0gZnJvbSBcIi4vcmVtb3RlUHJvdmlkZXIvaHR0cEdldFwiO1xuaW1wb3J0IHtcbiAgZnJvbUltZHNDcmVkZW50aWFscyxcbiAgaXNJbWRzQ3JlZGVudGlhbHNcbn0gZnJvbSBcIi4vcmVtb3RlUHJvdmlkZXIvSW1kc0NyZWRlbnRpYWxzXCI7XG5pbXBvcnQgeyByZXRyeSB9IGZyb20gXCIuL3JlbW90ZVByb3ZpZGVyL3JldHJ5XCI7XG5pbXBvcnQgeyBQcm92aWRlckVycm9yIH0gZnJvbSBcIkBhd3Mtc2RrL3Byb3BlcnR5LXByb3ZpZGVyXCI7XG5pbXBvcnQgeyBwYXJzZSB9IGZyb20gXCJ1cmxcIjtcbmltcG9ydCB7IFJlcXVlc3RPcHRpb25zIH0gZnJvbSBcImh0dHBcIjtcblxuZXhwb3J0IGNvbnN0IEVOVl9DTURTX0ZVTExfVVJJID0gXCJBV1NfQ09OVEFJTkVSX0NSRURFTlRJQUxTX0ZVTExfVVJJXCI7XG5leHBvcnQgY29uc3QgRU5WX0NNRFNfUkVMQVRJVkVfVVJJID0gXCJBV1NfQ09OVEFJTkVSX0NSRURFTlRJQUxTX1JFTEFUSVZFX1VSSVwiO1xuZXhwb3J0IGNvbnN0IEVOVl9DTURTX0FVVEhfVE9LRU4gPSBcIkFXU19DT05UQUlORVJfQVVUSE9SSVpBVElPTl9UT0tFTlwiO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBjcmVkZW50aWFsIHByb3ZpZGVyIHRoYXQgd2lsbCBzb3VyY2UgY3JlZGVudGlhbHMgZnJvbSB0aGUgRUNTXG4gKiBDb250YWluZXIgTWV0YWRhdGEgU2VydmljZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZnJvbUNvbnRhaW5lck1ldGFkYXRhKFxuICBpbml0OiBSZW1vdGVQcm92aWRlckluaXQgPSB7fVxuKTogQ3JlZGVudGlhbFByb3ZpZGVyIHtcbiAgY29uc3QgeyB0aW1lb3V0LCBtYXhSZXRyaWVzIH0gPSBwcm92aWRlckNvbmZpZ0Zyb21Jbml0KGluaXQpO1xuICByZXR1cm4gKCkgPT4ge1xuICAgIHJldHVybiBnZXRDbWRzVXJpKCkudGhlbih1cmwgPT5cbiAgICAgIHJldHJ5KGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgY3JlZHNSZXNwb25zZSA9IEpTT04ucGFyc2UoXG4gICAgICAgICAgYXdhaXQgcmVxdWVzdEZyb21FY3NJbWRzKHRpbWVvdXQsIHVybClcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKCFpc0ltZHNDcmVkZW50aWFscyhjcmVkc1Jlc3BvbnNlKSkge1xuICAgICAgICAgIHRocm93IG5ldyBQcm92aWRlckVycm9yKFxuICAgICAgICAgICAgXCJJbnZhbGlkIHJlc3BvbnNlIHJlY2VpdmVkIGZyb20gaW5zdGFuY2UgbWV0YWRhdGEgc2VydmljZS5cIlxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZnJvbUltZHNDcmVkZW50aWFscyhjcmVkc1Jlc3BvbnNlKTtcbiAgICAgIH0sIG1heFJldHJpZXMpXG4gICAgKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gcmVxdWVzdEZyb21FY3NJbWRzKFxuICB0aW1lb3V0OiBudW1iZXIsXG4gIG9wdGlvbnM6IFJlcXVlc3RPcHRpb25zXG4pOiBQcm9taXNlPHN0cmluZz4ge1xuICBpZiAocHJvY2Vzcy5lbnZbRU5WX0NNRFNfQVVUSF9UT0tFTl0pIHtcbiAgICBjb25zdCB7IGhlYWRlcnMgPSB7fSB9ID0gb3B0aW9ucztcbiAgICBoZWFkZXJzLkF1dGhvcml6YXRpb24gPSBwcm9jZXNzLmVudltFTlZfQ01EU19BVVRIX1RPS0VOXTtcbiAgICBvcHRpb25zLmhlYWRlcnMgPSBoZWFkZXJzO1xuICB9XG5cbiAgcmV0dXJuIGh0dHBHZXQoe1xuICAgIC4uLm9wdGlvbnMsXG4gICAgdGltZW91dFxuICB9KS50aGVuKGJ1ZmZlciA9PiBidWZmZXIudG9TdHJpbmcoKSk7XG59XG5cbmNvbnN0IENNRFNfSVAgPSBcIjE2OS4yNTQuMTcwLjJcIjtcbmNvbnN0IEdSRUVOR1JBU1NfSE9TVFMgPSB7XG4gIGxvY2FsaG9zdDogdHJ1ZSxcbiAgXCIxMjcuMC4wLjFcIjogdHJ1ZVxufTtcbmNvbnN0IEdSRUVOR1JBU1NfUFJPVE9DT0xTID0ge1xuICBcImh0dHA6XCI6IHRydWUsXG4gIFwiaHR0cHM6XCI6IHRydWVcbn07XG5cbmZ1bmN0aW9uIGdldENtZHNVcmkoKTogUHJvbWlzZTxSZXF1ZXN0T3B0aW9ucz4ge1xuICBpZiAocHJvY2Vzcy5lbnZbRU5WX0NNRFNfUkVMQVRJVkVfVVJJXSkge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoe1xuICAgICAgaG9zdG5hbWU6IENNRFNfSVAsXG4gICAgICBwYXRoOiBwcm9jZXNzLmVudltFTlZfQ01EU19SRUxBVElWRV9VUkldXG4gICAgfSk7XG4gIH1cblxuICBpZiAocHJvY2Vzcy5lbnZbRU5WX0NNRFNfRlVMTF9VUkldKSB7XG4gICAgY29uc3QgcGFyc2VkID0gcGFyc2UocHJvY2Vzcy5lbnZbRU5WX0NNRFNfRlVMTF9VUkldISk7XG4gICAgaWYgKCFwYXJzZWQuaG9zdG5hbWUgfHwgIShwYXJzZWQuaG9zdG5hbWUgaW4gR1JFRU5HUkFTU19IT1NUUykpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChcbiAgICAgICAgbmV3IFByb3ZpZGVyRXJyb3IoXG4gICAgICAgICAgYCR7cGFyc2VkLmhvc3RuYW1lfSBpcyBub3QgYSB2YWxpZCBjb250YWluZXIgbWV0YWRhdGEgc2VydmljZSBob3N0bmFtZWAsXG4gICAgICAgICAgZmFsc2VcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoIXBhcnNlZC5wcm90b2NvbCB8fCAhKHBhcnNlZC5wcm90b2NvbCBpbiBHUkVFTkdSQVNTX1BST1RPQ09MUykpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChcbiAgICAgICAgbmV3IFByb3ZpZGVyRXJyb3IoXG4gICAgICAgICAgYCR7cGFyc2VkLnByb3RvY29sfSBpcyBub3QgYSB2YWxpZCBjb250YWluZXIgbWV0YWRhdGEgc2VydmljZSBwcm90b2NvbGAsXG4gICAgICAgICAgZmFsc2VcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgIC4uLnBhcnNlZCxcbiAgICAgIHBvcnQ6IHBhcnNlZC5wb3J0ID8gcGFyc2VJbnQocGFyc2VkLnBvcnQsIDEwKSA6IHVuZGVmaW5lZFxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIFByb21pc2UucmVqZWN0KFxuICAgIG5ldyBQcm92aWRlckVycm9yKFxuICAgICAgXCJUaGUgY29udGFpbmVyIG1ldGFkYXRhIGNyZWRlbnRpYWwgcHJvdmlkZXIgY2Fubm90IGJlIHVzZWQgdW5sZXNzXCIgK1xuICAgICAgICBgIHRoZSAke0VOVl9DTURTX1JFTEFUSVZFX1VSSX0gb3IgJHtFTlZfQ01EU19GVUxMX1VSSX0gZW52aXJvbm1lbnRgICtcbiAgICAgICAgXCIgdmFyaWFibGUgaXMgc2V0XCIsXG4gICAgICBmYWxzZVxuICAgIClcbiAgKTtcbn1cbiJdfQ==

/***/ }),

/***/ 5222:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var tslib_1 = __nccwpck_require__(4351);
var RemoteProviderInit_1 = __nccwpck_require__(1568);
var httpGet_1 = __nccwpck_require__(4537);
var ImdsCredentials_1 = __nccwpck_require__(4339);
var retry_1 = __nccwpck_require__(8267);
var property_provider_1 = __nccwpck_require__(6772);
/**
 * Creates a credential provider that will source credentials from the EC2
 * Instance Metadata Service
 */
function fromInstanceMetadata(init) {
    var _this = this;
    if (init === void 0) { init = {}; }
    var _a = RemoteProviderInit_1.providerConfigFromInit(init), timeout = _a.timeout, maxRetries = _a.maxRetries;
    return function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var profile;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, retry_1.retry(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, requestFromEc2Imds(timeout)];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); }, maxRetries)];
                case 1:
                    profile = (_a.sent()).trim();
                    return [2 /*return*/, retry_1.retry(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var credsResponse, _a, _b;
                            return tslib_1.__generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        _b = (_a = JSON).parse;
                                        return [4 /*yield*/, requestFromEc2Imds(timeout, profile)];
                                    case 1:
                                        credsResponse = _b.apply(_a, [_c.sent()]);
                                        if (!ImdsCredentials_1.isImdsCredentials(credsResponse)) {
                                            throw new property_provider_1.ProviderError("Invalid response received from instance metadata service.");
                                        }
                                        return [2 /*return*/, ImdsCredentials_1.fromImdsCredentials(credsResponse)];
                                }
                            });
                        }); }, maxRetries)];
            }
        });
    }); };
}
exports.fromInstanceMetadata = fromInstanceMetadata;
var IMDS_IP = "169.254.169.254";
var IMDS_PATH = "latest/meta-data/iam/security-credentials";
function requestFromEc2Imds(timeout, path) {
    return httpGet_1.httpGet({
        host: IMDS_IP,
        path: "/" + IMDS_PATH + "/" + (path ? path : ""),
        timeout: timeout
    }).then(function (buffer) { return buffer.toString(); });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbUluc3RhbmNlTWV0YWRhdGEuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJmcm9tSW5zdGFuY2VNZXRhZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwwRUFHNkM7QUFDN0Msb0RBQW1EO0FBQ25ELG9FQUcwQztBQUMxQyxnREFBK0M7QUFDL0MsZ0VBQTJEO0FBRTNEOzs7R0FHRztBQUNILFNBQWdCLG9CQUFvQixDQUNsQyxJQUE2QjtJQUQvQixpQkF5QkM7SUF4QkMscUJBQUEsRUFBQSxTQUE2QjtJQUV2QixJQUFBLHNEQUFzRCxFQUFwRCxvQkFBTyxFQUFFLDBCQUEyQyxDQUFDO0lBQzdELE9BQU87Ozs7O3dCQUVILHFCQUFNLGFBQUssQ0FDVDs7b0NBQVkscUJBQU0sa0JBQWtCLENBQUMsT0FBTyxDQUFDLEVBQUE7b0NBQWpDLHNCQUFBLFNBQWlDLEVBQUE7OzZCQUFBLEVBQzdDLFVBQVUsQ0FDWCxFQUFBOztvQkFKRyxPQUFPLEdBQUcsQ0FDZCxTQUdDLENBQ0YsQ0FBQyxJQUFJLEVBQUU7b0JBRVIsc0JBQU8sYUFBSyxDQUFDOzs7Ozt3Q0FDVyxLQUFBLENBQUEsS0FBQSxJQUFJLENBQUEsQ0FBQyxLQUFLLENBQUE7d0NBQzlCLHFCQUFNLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsRUFBQTs7d0NBRHRDLGFBQWEsR0FBRyxjQUNwQixTQUEwQyxFQUMzQzt3Q0FDRCxJQUFJLENBQUMsbUNBQWlCLENBQUMsYUFBYSxDQUFDLEVBQUU7NENBQ3JDLE1BQU0sSUFBSSxpQ0FBYSxDQUNyQiwyREFBMkQsQ0FDNUQsQ0FBQzt5Q0FDSDt3Q0FFRCxzQkFBTyxxQ0FBbUIsQ0FBQyxhQUFhLENBQUMsRUFBQzs7OzZCQUMzQyxFQUFFLFVBQVUsQ0FBQyxFQUFDOzs7U0FDaEIsQ0FBQztBQUNKLENBQUM7QUF6QkQsb0RBeUJDO0FBRUQsSUFBTSxPQUFPLEdBQUcsaUJBQWlCLENBQUM7QUFDbEMsSUFBTSxTQUFTLEdBQUcsMkNBQTJDLENBQUM7QUFFOUQsU0FBUyxrQkFBa0IsQ0FBQyxPQUFlLEVBQUUsSUFBYTtJQUN4RCxPQUFPLGlCQUFPLENBQUM7UUFDYixJQUFJLEVBQUUsT0FBTztRQUNiLElBQUksRUFBRSxNQUFJLFNBQVMsVUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFFO1FBQ3pDLE9BQU8sU0FBQTtLQUNSLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQWpCLENBQWlCLENBQUMsQ0FBQztBQUN2QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ3JlZGVudGlhbFByb3ZpZGVyIH0gZnJvbSBcIkBhd3Mtc2RrL3R5cGVzXCI7XG5pbXBvcnQge1xuICBSZW1vdGVQcm92aWRlckluaXQsXG4gIHByb3ZpZGVyQ29uZmlnRnJvbUluaXRcbn0gZnJvbSBcIi4vcmVtb3RlUHJvdmlkZXIvUmVtb3RlUHJvdmlkZXJJbml0XCI7XG5pbXBvcnQgeyBodHRwR2V0IH0gZnJvbSBcIi4vcmVtb3RlUHJvdmlkZXIvaHR0cEdldFwiO1xuaW1wb3J0IHtcbiAgZnJvbUltZHNDcmVkZW50aWFscyxcbiAgaXNJbWRzQ3JlZGVudGlhbHNcbn0gZnJvbSBcIi4vcmVtb3RlUHJvdmlkZXIvSW1kc0NyZWRlbnRpYWxzXCI7XG5pbXBvcnQgeyByZXRyeSB9IGZyb20gXCIuL3JlbW90ZVByb3ZpZGVyL3JldHJ5XCI7XG5pbXBvcnQgeyBQcm92aWRlckVycm9yIH0gZnJvbSBcIkBhd3Mtc2RrL3Byb3BlcnR5LXByb3ZpZGVyXCI7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNyZWRlbnRpYWwgcHJvdmlkZXIgdGhhdCB3aWxsIHNvdXJjZSBjcmVkZW50aWFscyBmcm9tIHRoZSBFQzJcbiAqIEluc3RhbmNlIE1ldGFkYXRhIFNlcnZpY2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZyb21JbnN0YW5jZU1ldGFkYXRhKFxuICBpbml0OiBSZW1vdGVQcm92aWRlckluaXQgPSB7fVxuKTogQ3JlZGVudGlhbFByb3ZpZGVyIHtcbiAgY29uc3QgeyB0aW1lb3V0LCBtYXhSZXRyaWVzIH0gPSBwcm92aWRlckNvbmZpZ0Zyb21Jbml0KGluaXQpO1xuICByZXR1cm4gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHByb2ZpbGUgPSAoXG4gICAgICBhd2FpdCByZXRyeTxzdHJpbmc+KFxuICAgICAgICBhc3luYyAoKSA9PiBhd2FpdCByZXF1ZXN0RnJvbUVjMkltZHModGltZW91dCksXG4gICAgICAgIG1heFJldHJpZXNcbiAgICAgIClcbiAgICApLnRyaW0oKTtcblxuICAgIHJldHVybiByZXRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBjcmVkc1Jlc3BvbnNlID0gSlNPTi5wYXJzZShcbiAgICAgICAgYXdhaXQgcmVxdWVzdEZyb21FYzJJbWRzKHRpbWVvdXQsIHByb2ZpbGUpXG4gICAgICApO1xuICAgICAgaWYgKCFpc0ltZHNDcmVkZW50aWFscyhjcmVkc1Jlc3BvbnNlKSkge1xuICAgICAgICB0aHJvdyBuZXcgUHJvdmlkZXJFcnJvcihcbiAgICAgICAgICBcIkludmFsaWQgcmVzcG9uc2UgcmVjZWl2ZWQgZnJvbSBpbnN0YW5jZSBtZXRhZGF0YSBzZXJ2aWNlLlwiXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmcm9tSW1kc0NyZWRlbnRpYWxzKGNyZWRzUmVzcG9uc2UpO1xuICAgIH0sIG1heFJldHJpZXMpO1xuICB9O1xufVxuXG5jb25zdCBJTURTX0lQID0gXCIxNjkuMjU0LjE2OS4yNTRcIjtcbmNvbnN0IElNRFNfUEFUSCA9IFwibGF0ZXN0L21ldGEtZGF0YS9pYW0vc2VjdXJpdHktY3JlZGVudGlhbHNcIjtcblxuZnVuY3Rpb24gcmVxdWVzdEZyb21FYzJJbWRzKHRpbWVvdXQ6IG51bWJlciwgcGF0aD86IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gIHJldHVybiBodHRwR2V0KHtcbiAgICBob3N0OiBJTURTX0lQLFxuICAgIHBhdGg6IGAvJHtJTURTX1BBVEh9LyR7cGF0aCA/IHBhdGggOiBcIlwifWAsXG4gICAgdGltZW91dFxuICB9KS50aGVuKGJ1ZmZlciA9PiBidWZmZXIudG9TdHJpbmcoKSk7XG59XG4iXX0=

/***/ }),

/***/ 3496:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var tslib_1 = __nccwpck_require__(4351);
tslib_1.__exportStar(__nccwpck_require__(6864), exports);
tslib_1.__exportStar(__nccwpck_require__(5222), exports);
tslib_1.__exportStar(__nccwpck_require__(1568), exports);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxrRUFBd0M7QUFDeEMsaUVBQXVDO0FBQ3ZDLDhFQUFvRCIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCAqIGZyb20gXCIuL2Zyb21Db250YWluZXJNZXRhZGF0YVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vZnJvbUluc3RhbmNlTWV0YWRhdGFcIjtcbmV4cG9ydCAqIGZyb20gXCIuL3JlbW90ZVByb3ZpZGVyL1JlbW90ZVByb3ZpZGVySW5pdFwiO1xuIl19

/***/ }),

/***/ 4339:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function isImdsCredentials(arg) {
    return (Boolean(arg) &&
        typeof arg === "object" &&
        typeof arg.AccessKeyId === "string" &&
        typeof arg.SecretAccessKey === "string" &&
        typeof arg.Token === "string" &&
        typeof arg.Expiration === "string");
}
exports.isImdsCredentials = isImdsCredentials;
function fromImdsCredentials(creds) {
    return {
        accessKeyId: creds.AccessKeyId,
        secretAccessKey: creds.SecretAccessKey,
        sessionToken: creds.Token,
        expiration: new Date(creds.Expiration)
    };
}
exports.fromImdsCredentials = fromImdsCredentials;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW1kc0NyZWRlbnRpYWxzLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsicmVtb3RlUHJvdmlkZXIvSW1kc0NyZWRlbnRpYWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBU0EsU0FBZ0IsaUJBQWlCLENBQUMsR0FBUTtJQUN4QyxPQUFPLENBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNaLE9BQU8sR0FBRyxLQUFLLFFBQVE7UUFDdkIsT0FBTyxHQUFHLENBQUMsV0FBVyxLQUFLLFFBQVE7UUFDbkMsT0FBTyxHQUFHLENBQUMsZUFBZSxLQUFLLFFBQVE7UUFDdkMsT0FBTyxHQUFHLENBQUMsS0FBSyxLQUFLLFFBQVE7UUFDN0IsT0FBTyxHQUFHLENBQUMsVUFBVSxLQUFLLFFBQVEsQ0FDbkMsQ0FBQztBQUNKLENBQUM7QUFURCw4Q0FTQztBQUVELFNBQWdCLG1CQUFtQixDQUFDLEtBQXNCO0lBQ3hELE9BQU87UUFDTCxXQUFXLEVBQUUsS0FBSyxDQUFDLFdBQVc7UUFDOUIsZUFBZSxFQUFFLEtBQUssQ0FBQyxlQUFlO1FBQ3RDLFlBQVksRUFBRSxLQUFLLENBQUMsS0FBSztRQUN6QixVQUFVLEVBQUUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztLQUN2QyxDQUFDO0FBQ0osQ0FBQztBQVBELGtEQU9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ3JlZGVudGlhbHMgfSBmcm9tIFwiQGF3cy1zZGsvdHlwZXNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJbWRzQ3JlZGVudGlhbHMge1xuICBBY2Nlc3NLZXlJZDogc3RyaW5nO1xuICBTZWNyZXRBY2Nlc3NLZXk6IHN0cmluZztcbiAgVG9rZW46IHN0cmluZztcbiAgRXhwaXJhdGlvbjogc3RyaW5nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNJbWRzQ3JlZGVudGlhbHMoYXJnOiBhbnkpOiBhcmcgaXMgSW1kc0NyZWRlbnRpYWxzIHtcbiAgcmV0dXJuIChcbiAgICBCb29sZWFuKGFyZykgJiZcbiAgICB0eXBlb2YgYXJnID09PSBcIm9iamVjdFwiICYmXG4gICAgdHlwZW9mIGFyZy5BY2Nlc3NLZXlJZCA9PT0gXCJzdHJpbmdcIiAmJlxuICAgIHR5cGVvZiBhcmcuU2VjcmV0QWNjZXNzS2V5ID09PSBcInN0cmluZ1wiICYmXG4gICAgdHlwZW9mIGFyZy5Ub2tlbiA9PT0gXCJzdHJpbmdcIiAmJlxuICAgIHR5cGVvZiBhcmcuRXhwaXJhdGlvbiA9PT0gXCJzdHJpbmdcIlxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZnJvbUltZHNDcmVkZW50aWFscyhjcmVkczogSW1kc0NyZWRlbnRpYWxzKTogQ3JlZGVudGlhbHMge1xuICByZXR1cm4ge1xuICAgIGFjY2Vzc0tleUlkOiBjcmVkcy5BY2Nlc3NLZXlJZCxcbiAgICBzZWNyZXRBY2Nlc3NLZXk6IGNyZWRzLlNlY3JldEFjY2Vzc0tleSxcbiAgICBzZXNzaW9uVG9rZW46IGNyZWRzLlRva2VuLFxuICAgIGV4cGlyYXRpb246IG5ldyBEYXRlKGNyZWRzLkV4cGlyYXRpb24pXG4gIH07XG59XG4iXX0=

/***/ }),

/***/ 1568:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DEFAULT_TIMEOUT = 1000;
exports.DEFAULT_MAX_RETRIES = 0;
function providerConfigFromInit(init) {
    var _a = init.timeout, timeout = _a === void 0 ? exports.DEFAULT_TIMEOUT : _a, _b = init.maxRetries, maxRetries = _b === void 0 ? exports.DEFAULT_MAX_RETRIES : _b;
    return { maxRetries: maxRetries, timeout: timeout };
}
exports.providerConfigFromInit = providerConfigFromInit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVtb3RlUHJvdmlkZXJJbml0LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsicmVtb3RlUHJvdmlkZXIvUmVtb3RlUHJvdmlkZXJJbml0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQWEsUUFBQSxlQUFlLEdBQUcsSUFBSSxDQUFDO0FBQ3ZCLFFBQUEsbUJBQW1CLEdBQUcsQ0FBQyxDQUFDO0FBZ0JyQyxTQUFnQixzQkFBc0IsQ0FDcEMsSUFBd0I7SUFFaEIsSUFBQSxpQkFBeUIsRUFBekIsc0RBQXlCLEVBQUUsb0JBQWdDLEVBQWhDLDZEQUFnQyxDQUFVO0lBRTdFLE9BQU8sRUFBRSxVQUFVLFlBQUEsRUFBRSxPQUFPLFNBQUEsRUFBRSxDQUFDO0FBQ2pDLENBQUM7QUFORCx3REFNQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBERUZBVUxUX1RJTUVPVVQgPSAxMDAwO1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfTUFYX1JFVFJJRVMgPSAwO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlbW90ZVByb3ZpZGVyQ29uZmlnIHtcbiAgLyoqXG4gICAqIFRoZSBjb25uZWN0aW9uIHRpbWVvdXQgKGluIG1pbGxpc2Vjb25kcylcbiAgICovXG4gIHRpbWVvdXQ6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIG1heGltdW0gbnVtYmVyIG9mIHRpbWVzIHRoZSBIVFRQIGNvbm5lY3Rpb24gc2hvdWxkIGJlIHJldHJpZWRcbiAgICovXG4gIG1heFJldHJpZXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgUmVtb3RlUHJvdmlkZXJJbml0ID0gUGFydGlhbDxSZW1vdGVQcm92aWRlckNvbmZpZz47XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlckNvbmZpZ0Zyb21Jbml0KFxuICBpbml0OiBSZW1vdGVQcm92aWRlckluaXRcbik6IFJlbW90ZVByb3ZpZGVyQ29uZmlnIHtcbiAgY29uc3QgeyB0aW1lb3V0ID0gREVGQVVMVF9USU1FT1VULCBtYXhSZXRyaWVzID0gREVGQVVMVF9NQVhfUkVUUklFUyB9ID0gaW5pdDtcblxuICByZXR1cm4geyBtYXhSZXRyaWVzLCB0aW1lb3V0IH07XG59XG4iXX0=

/***/ }),

/***/ 4537:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var buffer_1 = __nccwpck_require__(4293);
var http_1 = __nccwpck_require__(8605);
var property_provider_1 = __nccwpck_require__(6772);
/**
 * @internal
 */
function httpGet(options) {
    return new Promise(function (resolve, reject) {
        var request = http_1.get(options);
        request.on("error", function (err) {
            reject(new property_provider_1.ProviderError("Unable to connect to instance metadata service"));
        });
        request.on("response", function (res) {
            var _a = res.statusCode, statusCode = _a === void 0 ? 400 : _a;
            if (statusCode < 200 || 300 <= statusCode) {
                reject(new property_provider_1.ProviderError("Error response received from instance metadata service"));
            }
            var chunks = [];
            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
            res.on("end", function () {
                resolve(buffer_1.Buffer.concat(chunks));
            });
        });
    });
}
exports.httpGet = httpGet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cEdldC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbInJlbW90ZVByb3ZpZGVyL2h0dHBHZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpQ0FBZ0M7QUFDaEMsNkJBQTREO0FBQzVELGdFQUEyRDtBQUUzRDs7R0FFRztBQUNILFNBQWdCLE9BQU8sQ0FBQyxPQUFnQztJQUN0RCxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07UUFDakMsSUFBTSxPQUFPLEdBQUcsVUFBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQUEsR0FBRztZQUNyQixNQUFNLENBQ0osSUFBSSxpQ0FBYSxDQUFDLGdEQUFnRCxDQUFDLENBQ3BFLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLFVBQUMsR0FBb0I7WUFDbEMsSUFBQSxtQkFBZ0IsRUFBaEIscUNBQWdCLENBQVM7WUFDakMsSUFBSSxVQUFVLEdBQUcsR0FBRyxJQUFJLEdBQUcsSUFBSSxVQUFVLEVBQUU7Z0JBQ3pDLE1BQU0sQ0FDSixJQUFJLGlDQUFhLENBQ2Ysd0RBQXdELENBQ3pELENBQ0YsQ0FBQzthQUNIO1lBRUQsSUFBTSxNQUFNLEdBQWtCLEVBQUUsQ0FBQztZQUNqQyxHQUFHLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFBLEtBQUs7Z0JBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBZSxDQUFDLENBQUM7WUFDL0IsQ0FBQyxDQUFDLENBQUM7WUFDSCxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRTtnQkFDWixPQUFPLENBQUMsZUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUE1QkQsMEJBNEJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQnVmZmVyIH0gZnJvbSBcImJ1ZmZlclwiO1xuaW1wb3J0IHsgZ2V0LCBJbmNvbWluZ01lc3NhZ2UsIFJlcXVlc3RPcHRpb25zIH0gZnJvbSBcImh0dHBcIjtcbmltcG9ydCB7IFByb3ZpZGVyRXJyb3IgfSBmcm9tIFwiQGF3cy1zZGsvcHJvcGVydHktcHJvdmlkZXJcIjtcblxuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGh0dHBHZXQob3B0aW9uczogUmVxdWVzdE9wdGlvbnMgfCBzdHJpbmcpOiBQcm9taXNlPEJ1ZmZlcj4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IHJlcXVlc3QgPSBnZXQob3B0aW9ucyk7XG4gICAgcmVxdWVzdC5vbihcImVycm9yXCIsIGVyciA9PiB7XG4gICAgICByZWplY3QoXG4gICAgICAgIG5ldyBQcm92aWRlckVycm9yKFwiVW5hYmxlIHRvIGNvbm5lY3QgdG8gaW5zdGFuY2UgbWV0YWRhdGEgc2VydmljZVwiKVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHJlcXVlc3Qub24oXCJyZXNwb25zZVwiLCAocmVzOiBJbmNvbWluZ01lc3NhZ2UpID0+IHtcbiAgICAgIGNvbnN0IHsgc3RhdHVzQ29kZSA9IDQwMCB9ID0gcmVzO1xuICAgICAgaWYgKHN0YXR1c0NvZGUgPCAyMDAgfHwgMzAwIDw9IHN0YXR1c0NvZGUpIHtcbiAgICAgICAgcmVqZWN0KFxuICAgICAgICAgIG5ldyBQcm92aWRlckVycm9yKFxuICAgICAgICAgICAgXCJFcnJvciByZXNwb25zZSByZWNlaXZlZCBmcm9tIGluc3RhbmNlIG1ldGFkYXRhIHNlcnZpY2VcIlxuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY2h1bmtzOiBBcnJheTxCdWZmZXI+ID0gW107XG4gICAgICByZXMub24oXCJkYXRhXCIsIGNodW5rID0+IHtcbiAgICAgICAgY2h1bmtzLnB1c2goY2h1bmsgYXMgQnVmZmVyKTtcbiAgICAgIH0pO1xuICAgICAgcmVzLm9uKFwiZW5kXCIsICgpID0+IHtcbiAgICAgICAgcmVzb2x2ZShCdWZmZXIuY29uY2F0KGNodW5rcykpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuIl19

/***/ }),

/***/ 8267:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * @internal
 */
function retry(toRetry, maxRetries) {
    var promise = toRetry();
    for (var i = 0; i < maxRetries; i++) {
        promise = promise.catch(toRetry);
    }
    return promise;
}
exports.retry = retry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV0cnkuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJyZW1vdGVQcm92aWRlci9yZXRyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBOztHQUVHO0FBQ0gsU0FBZ0IsS0FBSyxDQUNuQixPQUE2QixFQUM3QixVQUFrQjtJQUVsQixJQUFJLE9BQU8sR0FBRyxPQUFPLEVBQUUsQ0FBQztJQUN4QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ25DLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ2xDO0lBRUQsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQztBQVZELHNCQVVDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBSZXRyeWFibGVQcm92aWRlcjxUPiB7XG4gICgpOiBQcm9taXNlPFQ+O1xufVxuXG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgZnVuY3Rpb24gcmV0cnk8VD4oXG4gIHRvUmV0cnk6IFJldHJ5YWJsZVByb3ZpZGVyPFQ+LFxuICBtYXhSZXRyaWVzOiBudW1iZXJcbik6IFByb21pc2U8VD4ge1xuICBsZXQgcHJvbWlzZSA9IHRvUmV0cnkoKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXhSZXRyaWVzOyBpKyspIHtcbiAgICBwcm9taXNlID0gcHJvbWlzZS5jYXRjaCh0b1JldHJ5KTtcbiAgfVxuXG4gIHJldHVybiBwcm9taXNlO1xufVxuIl19

/***/ }),

/***/ 6902:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var tslib_1 = __nccwpck_require__(4351);
var property_provider_1 = __nccwpck_require__(6772);
var shared_ini_file_loader_1 = __nccwpck_require__(9697);
var DEFAULT_PROFILE = "default";
exports.ENV_PROFILE = "AWS_PROFILE";
function isStaticCredsProfile(arg) {
    return (Boolean(arg) &&
        typeof arg === "object" &&
        typeof arg.aws_access_key_id === "string" &&
        typeof arg.aws_secret_access_key === "string" &&
        ["undefined", "string"].indexOf(typeof arg.aws_session_token) > -1);
}
function isAssumeRoleProfile(arg) {
    return (Boolean(arg) &&
        typeof arg === "object" &&
        typeof arg.role_arn === "string" &&
        typeof arg.source_profile === "string" &&
        ["undefined", "string"].indexOf(typeof arg.role_session_name) > -1 &&
        ["undefined", "string"].indexOf(typeof arg.external_id) > -1 &&
        ["undefined", "string"].indexOf(typeof arg.mfa_serial) > -1);
}
/**
 * Creates a credential provider that will read from ini files and supports
 * role assumption and multi-factor authentication.
 */
function fromIni(init) {
    if (init === void 0) { init = {}; }
    return function () {
        return parseKnownFiles(init).then(function (profiles) {
            return resolveProfileData(getMasterProfileName(init), profiles, init);
        });
    };
}
exports.fromIni = fromIni;
function getMasterProfileName(init) {
    return init.profile || process.env[exports.ENV_PROFILE] || DEFAULT_PROFILE;
}
exports.getMasterProfileName = getMasterProfileName;
function resolveProfileData(profileName, profiles, options, visitedProfiles) {
    if (visitedProfiles === void 0) { visitedProfiles = {}; }
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var data, ExternalId, mfa_serial, RoleArn, _a, RoleSessionName, source_profile, sourceCreds, params, _b, _c, _d;
        var _e;
        return tslib_1.__generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    data = profiles[profileName];
                    // If this is not the first profile visited, static credentials should be
                    // preferred over role assumption metadata. This special treatment of
                    // second and subsequent hops is to ensure compatibility with the AWS CLI.
                    if (Object.keys(visitedProfiles).length > 0 && isStaticCredsProfile(data)) {
                        return [2 /*return*/, resolveStaticCredentials(data)];
                    }
                    if (!isAssumeRoleProfile(data)) return [3 /*break*/, 4];
                    ExternalId = data.external_id, mfa_serial = data.mfa_serial, RoleArn = data.role_arn, _a = data.role_session_name, RoleSessionName = _a === void 0 ? "aws-sdk-js-" + Date.now() : _a, source_profile = data.source_profile;
                    if (!options.roleAssumer) {
                        throw new property_provider_1.ProviderError("Profile " + profileName + " requires a role to be assumed, but no" +
                            " role assumption callback was provided.", false);
                    }
                    if (source_profile in visitedProfiles) {
                        throw new property_provider_1.ProviderError("Detected a cycle attempting to resolve credentials for profile" +
                            (" " + getMasterProfileName(options) + ". Profiles visited: ") +
                            Object.keys(visitedProfiles).join(", "), false);
                    }
                    sourceCreds = resolveProfileData(source_profile, profiles, options, tslib_1.__assign(tslib_1.__assign({}, visitedProfiles), (_e = {}, _e[source_profile] = true, _e)));
                    params = { RoleArn: RoleArn, RoleSessionName: RoleSessionName, ExternalId: ExternalId };
                    if (!mfa_serial) return [3 /*break*/, 2];
                    if (!options.mfaCodeProvider) {
                        throw new property_provider_1.ProviderError("Profile " + profileName + " requires multi-factor authentication," +
                            " but no MFA code callback was provided.", false);
                    }
                    params.SerialNumber = mfa_serial;
                    _b = params;
                    return [4 /*yield*/, options.mfaCodeProvider(mfa_serial)];
                case 1:
                    _b.TokenCode = _f.sent();
                    _f.label = 2;
                case 2:
                    _d = (_c = options).roleAssumer;
                    return [4 /*yield*/, sourceCreds];
                case 3: return [2 /*return*/, _d.apply(_c, [_f.sent(), params])];
                case 4:
                    // If no role assumption metadata is present, attempt to load static
                    // credentials from the selected profile.
                    if (isStaticCredsProfile(data)) {
                        return [2 /*return*/, resolveStaticCredentials(data)];
                    }
                    // If the profile cannot be parsed or contains neither static credentials
                    // nor role assumption metadata, throw an error. This should be considered a
                    // terminal resolution error if a profile has been specified by the user
                    // (whether via a parameter, an environment variable, or another profile's
                    // `source_profile` key).
                    throw new property_provider_1.ProviderError("Profile " + profileName + " could not be found or parsed in shared" +
                        " credentials file.");
            }
        });
    });
}
function parseKnownFiles(init) {
    var _a = init.loadedConfig, loadedConfig = _a === void 0 ? shared_ini_file_loader_1.loadSharedConfigFiles(init) : _a;
    return loadedConfig.then(function (parsedFiles) {
        var configFile = parsedFiles.configFile, credentialsFile = parsedFiles.credentialsFile;
        return tslib_1.__assign(tslib_1.__assign({}, configFile), credentialsFile);
    });
}
exports.parseKnownFiles = parseKnownFiles;
function resolveStaticCredentials(profile) {
    return Promise.resolve({
        accessKeyId: profile.aws_access_key_id,
        secretAccessKey: profile.aws_secret_access_key,
        sessionToken: profile.aws_session_token
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxnRUFBMkQ7QUFDM0QsMEVBTXlDO0FBRXpDLElBQU0sZUFBZSxHQUFHLFNBQVMsQ0FBQztBQUNyQixRQUFBLFdBQVcsR0FBRyxhQUFhLENBQUM7QUE0RXpDLFNBQVMsb0JBQW9CLENBQUMsR0FBUTtJQUNwQyxPQUFPLENBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNaLE9BQU8sR0FBRyxLQUFLLFFBQVE7UUFDdkIsT0FBTyxHQUFHLENBQUMsaUJBQWlCLEtBQUssUUFBUTtRQUN6QyxPQUFPLEdBQUcsQ0FBQyxxQkFBcUIsS0FBSyxRQUFRO1FBQzdDLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUNuRSxDQUFDO0FBQ0osQ0FBQztBQU9ELFNBQVMsbUJBQW1CLENBQUMsR0FBUTtJQUNuQyxPQUFPLENBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNaLE9BQU8sR0FBRyxLQUFLLFFBQVE7UUFDdkIsT0FBTyxHQUFHLENBQUMsUUFBUSxLQUFLLFFBQVE7UUFDaEMsT0FBTyxHQUFHLENBQUMsY0FBYyxLQUFLLFFBQVE7UUFDdEMsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xFLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUQsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUM1RCxDQUFDO0FBQ0osQ0FBQztBQUVEOzs7R0FHRztBQUNILFNBQWdCLE9BQU8sQ0FBQyxJQUFzQjtJQUF0QixxQkFBQSxFQUFBLFNBQXNCO0lBQzVDLE9BQU87UUFDTCxPQUFBLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxRQUFRO1lBQ2pDLE9BQUEsa0JBQWtCLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQztRQUE5RCxDQUE4RCxDQUMvRDtJQUZELENBRUMsQ0FBQztBQUNOLENBQUM7QUFMRCwwQkFLQztBQUVELFNBQWdCLG9CQUFvQixDQUFDLElBQWlCO0lBQ3BELE9BQU8sSUFBSSxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFXLENBQUMsSUFBSSxlQUFlLENBQUM7QUFDckUsQ0FBQztBQUZELG9EQUVDO0FBRUQsU0FBZSxrQkFBa0IsQ0FDL0IsV0FBbUIsRUFDbkIsUUFBdUIsRUFDdkIsT0FBb0IsRUFDcEIsZUFBcUQ7SUFBckQsZ0NBQUEsRUFBQSxvQkFBcUQ7Ozs7Ozs7b0JBRS9DLElBQUksR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBRW5DLHlFQUF5RTtvQkFDekUscUVBQXFFO29CQUNyRSwwRUFBMEU7b0JBQzFFLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLG9CQUFvQixDQUFDLElBQUksQ0FBQyxFQUFFO3dCQUN6RSxzQkFBTyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsRUFBQztxQkFDdkM7eUJBSUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEVBQXpCLHdCQUF5QjtvQkFFWixVQUFVLEdBS3JCLElBQUksWUFMaUIsRUFDdkIsVUFBVSxHQUlSLElBQUksV0FKSSxFQUNBLE9BQU8sR0FHZixJQUFJLFNBSFcsRUFDakIsS0FFRSxJQUFJLGtCQUZ5RCxFQUE1QyxlQUFlLG1CQUFHLGFBQWEsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUEsRUFDL0QsY0FBYyxHQUNaLElBQUksZUFEUSxDQUNQO29CQUVULElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFO3dCQUN4QixNQUFNLElBQUksaUNBQWEsQ0FDckIsYUFBVyxXQUFXLDJDQUF3Qzs0QkFDNUQseUNBQXlDLEVBQzNDLEtBQUssQ0FDTixDQUFDO3FCQUNIO29CQUVELElBQUksY0FBYyxJQUFJLGVBQWUsRUFBRTt3QkFDckMsTUFBTSxJQUFJLGlDQUFhLENBQ3JCLGdFQUFnRTs2QkFDOUQsTUFBSSxvQkFBb0IsQ0FBQyxPQUFPLENBQUMseUJBQXNCLENBQUE7NEJBQ3ZELE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUN6QyxLQUFLLENBQ04sQ0FBQztxQkFDSDtvQkFFSyxXQUFXLEdBQUcsa0JBQWtCLENBQUMsY0FBYyxFQUFFLFFBQVEsRUFBRSxPQUFPLHdDQUNuRSxlQUFlLGdCQUNqQixjQUFjLElBQUcsSUFBSSxPQUN0QixDQUFDO29CQUNHLE1BQU0sR0FBcUIsRUFBRSxPQUFPLFNBQUEsRUFBRSxlQUFlLGlCQUFBLEVBQUUsVUFBVSxZQUFBLEVBQUUsQ0FBQzt5QkFDdEUsVUFBVSxFQUFWLHdCQUFVO29CQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFO3dCQUM1QixNQUFNLElBQUksaUNBQWEsQ0FDckIsYUFBVyxXQUFXLDJDQUF3Qzs0QkFDNUQseUNBQXlDLEVBQzNDLEtBQUssQ0FDTixDQUFDO3FCQUNIO29CQUNELE1BQU0sQ0FBQyxZQUFZLEdBQUcsVUFBVSxDQUFDO29CQUNqQyxLQUFBLE1BQU0sQ0FBQTtvQkFBYSxxQkFBTSxPQUFPLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxFQUFBOztvQkFBNUQsR0FBTyxTQUFTLEdBQUcsU0FBeUMsQ0FBQzs7O29CQUd4RCxLQUFBLENBQUEsS0FBQSxPQUFPLENBQUEsQ0FBQyxXQUFXLENBQUE7b0JBQUMscUJBQU0sV0FBVyxFQUFBO3dCQUE1QyxzQkFBTyxjQUFvQixTQUFpQixFQUFFLE1BQU0sRUFBQyxFQUFDOztvQkFHeEQsb0VBQW9FO29CQUNwRSx5Q0FBeUM7b0JBQ3pDLElBQUksb0JBQW9CLENBQUMsSUFBSSxDQUFDLEVBQUU7d0JBQzlCLHNCQUFPLHdCQUF3QixDQUFDLElBQUksQ0FBQyxFQUFDO3FCQUN2QztvQkFFRCx5RUFBeUU7b0JBQ3pFLDRFQUE0RTtvQkFDNUUsd0VBQXdFO29CQUN4RSwwRUFBMEU7b0JBQzFFLHlCQUF5QjtvQkFDekIsTUFBTSxJQUFJLGlDQUFhLENBQ3JCLGFBQVcsV0FBVyw0Q0FBeUM7d0JBQzdELG9CQUFvQixDQUN2QixDQUFDOzs7O0NBQ0g7QUFFRCxTQUFnQixlQUFlLENBQUMsSUFBaUI7SUFDdkMsSUFBQSxzQkFBMEMsRUFBMUMsd0ZBQTBDLENBQVU7SUFFNUQsT0FBTyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQUEsV0FBVztRQUMxQixJQUFBLG1DQUFVLEVBQUUsNkNBQWUsQ0FBaUI7UUFDcEQsNkNBQ0ssVUFBVSxHQUNWLGVBQWUsRUFDbEI7SUFDSixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFWRCwwQ0FVQztBQUVELFNBQVMsd0JBQXdCLENBQy9CLE9BQTJCO0lBRTNCLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUNyQixXQUFXLEVBQUUsT0FBTyxDQUFDLGlCQUFpQjtRQUN0QyxlQUFlLEVBQUUsT0FBTyxDQUFDLHFCQUFxQjtRQUM5QyxZQUFZLEVBQUUsT0FBTyxDQUFDLGlCQUFpQjtLQUN4QyxDQUFDLENBQUM7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ3JlZGVudGlhbFByb3ZpZGVyLCBDcmVkZW50aWFscyB9IGZyb20gXCJAYXdzLXNkay90eXBlc1wiO1xuaW1wb3J0IHsgUHJvdmlkZXJFcnJvciB9IGZyb20gXCJAYXdzLXNkay9wcm9wZXJ0eS1wcm92aWRlclwiO1xuaW1wb3J0IHtcbiAgbG9hZFNoYXJlZENvbmZpZ0ZpbGVzLFxuICBQYXJzZWRJbmlEYXRhLFxuICBQcm9maWxlLFxuICBTaGFyZWRDb25maWdGaWxlcyxcbiAgU2hhcmVkQ29uZmlnSW5pdFxufSBmcm9tIFwiQGF3cy1zZGsvc2hhcmVkLWluaS1maWxlLWxvYWRlclwiO1xuXG5jb25zdCBERUZBVUxUX1BST0ZJTEUgPSBcImRlZmF1bHRcIjtcbmV4cG9ydCBjb25zdCBFTlZfUFJPRklMRSA9IFwiQVdTX1BST0ZJTEVcIjtcblxuLyoqXG4gKiBAc2VlIGh0dHA6Ly9kb2NzLmF3cy5hbWF6b24uY29tL0FXU0phdmFTY3JpcHRTREsvbGF0ZXN0L0FXUy9TVFMuaHRtbCNhc3N1bWVSb2xlLXByb3BlcnR5XG4gKiBUT0RPIHVwZGF0ZSB0aGUgYWJvdmUgdG8gbGluayB0byBWMyBkb2NzXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQXNzdW1lUm9sZVBhcmFtcyB7XG4gIC8qKlxuICAgKiBUaGUgaWRlbnRpZmllciBvZiB0aGUgcm9sZSB0byBiZSBhc3N1bWVkLlxuICAgKi9cbiAgUm9sZUFybjogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBIG5hbWUgZm9yIHRoZSBhc3N1bWVkIHJvbGUgc2Vzc2lvbi5cbiAgICovXG4gIFJvbGVTZXNzaW9uTmFtZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBIHVuaXF1ZSBpZGVudGlmaWVyIHRoYXQgaXMgdXNlZCBieSB0aGlyZCBwYXJ0aWVzIHdoZW4gYXNzdW1pbmcgcm9sZXMgaW5cbiAgICogdGhlaXIgY3VzdG9tZXJzJyBhY2NvdW50cy5cbiAgICovXG4gIEV4dGVybmFsSWQ/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBpZGVudGlmaWNhdGlvbiBudW1iZXIgb2YgdGhlIE1GQSBkZXZpY2UgdGhhdCBpcyBhc3NvY2lhdGVkIHdpdGggdGhlXG4gICAqIHVzZXIgd2hvIGlzIG1ha2luZyB0aGUgYEFzc3VtZVJvbGVgIGNhbGwuXG4gICAqL1xuICBTZXJpYWxOdW1iZXI/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSB2YWx1ZSBwcm92aWRlZCBieSB0aGUgTUZBIGRldmljZS5cbiAgICovXG4gIFRva2VuQ29kZT86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGcm9tSW5pSW5pdCBleHRlbmRzIFNoYXJlZENvbmZpZ0luaXQge1xuICAvKipcbiAgICogVGhlIGNvbmZpZ3VyYXRpb24gcHJvZmlsZSB0byB1c2UuXG4gICAqL1xuICBwcm9maWxlPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBIHByb21pc2UgdGhhdCB3aWxsIGJlIHJlc29sdmVkIHdpdGggbG9hZGVkIGFuZCBwYXJzZWQgY3JlZGVudGlhbHMgZmlsZXMuXG4gICAqIFVzZWQgdG8gYXZvaWQgbG9hZGluZyBzaGFyZWQgY29uZmlnIGZpbGVzIG11bHRpcGxlIHRpbWVzLlxuICAgKi9cbiAgbG9hZGVkQ29uZmlnPzogUHJvbWlzZTxTaGFyZWRDb25maWdGaWxlcz47XG5cbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gdGhhdCByZXR1cm5hIGEgcHJvbWlzZSBmdWxmaWxsZWQgd2l0aCBhbiBNRkEgdG9rZW4gY29kZSBmb3JcbiAgICogdGhlIHByb3ZpZGVkIE1GQSBTZXJpYWwgY29kZS4gSWYgYSBwcm9maWxlIHJlcXVpcmVzIGFuIE1GQSBjb2RlIGFuZFxuICAgKiBgbWZhQ29kZVByb3ZpZGVyYCBpcyBub3QgYSB2YWxpZCBmdW5jdGlvbiwgdGhlIGNyZWRlbnRpYWwgcHJvdmlkZXJcbiAgICogcHJvbWlzZSB3aWxsIGJlIHJlamVjdGVkLlxuICAgKlxuICAgKiBAcGFyYW0gbWZhU2VyaWFsIFRoZSBzZXJpYWwgY29kZSBvZiB0aGUgTUZBIGRldmljZSBzcGVjaWZpZWQuXG4gICAqL1xuICBtZmFDb2RlUHJvdmlkZXI/OiAobWZhU2VyaWFsOiBzdHJpbmcpID0+IFByb21pc2U8c3RyaW5nPjtcblxuICAvKipcbiAgICogQSBmdW5jdGlvbiB0aGF0IGFzc3VtZXMgYSByb2xlIGFuZCByZXR1cm5zIGEgcHJvbWlzZSBmdWxmaWxsZWQgd2l0aFxuICAgKiBjcmVkZW50aWFscyBmb3IgdGhlIGFzc3VtZWQgcm9sZS5cbiAgICpcbiAgICogQHBhcmFtIHNvdXJjZUNyZWRzIFRoZSBjcmVkZW50aWFscyB3aXRoIHdoaWNoIHRvIGFzc3VtZSBhIHJvbGUuXG4gICAqIEBwYXJhbSBwYXJhbXNcbiAgICovXG4gIHJvbGVBc3N1bWVyPzogKFxuICAgIHNvdXJjZUNyZWRzOiBDcmVkZW50aWFscyxcbiAgICBwYXJhbXM6IEFzc3VtZVJvbGVQYXJhbXNcbiAgKSA9PiBQcm9taXNlPENyZWRlbnRpYWxzPjtcbn1cblxuaW50ZXJmYWNlIFN0YXRpY0NyZWRzUHJvZmlsZSBleHRlbmRzIFByb2ZpbGUge1xuICBhd3NfYWNjZXNzX2tleV9pZDogc3RyaW5nO1xuICBhd3Nfc2VjcmV0X2FjY2Vzc19rZXk6IHN0cmluZztcbiAgYXdzX3Nlc3Npb25fdG9rZW4/OiBzdHJpbmc7XG59XG5cbmZ1bmN0aW9uIGlzU3RhdGljQ3JlZHNQcm9maWxlKGFyZzogYW55KTogYXJnIGlzIFN0YXRpY0NyZWRzUHJvZmlsZSB7XG4gIHJldHVybiAoXG4gICAgQm9vbGVhbihhcmcpICYmXG4gICAgdHlwZW9mIGFyZyA9PT0gXCJvYmplY3RcIiAmJlxuICAgIHR5cGVvZiBhcmcuYXdzX2FjY2Vzc19rZXlfaWQgPT09IFwic3RyaW5nXCIgJiZcbiAgICB0eXBlb2YgYXJnLmF3c19zZWNyZXRfYWNjZXNzX2tleSA9PT0gXCJzdHJpbmdcIiAmJlxuICAgIFtcInVuZGVmaW5lZFwiLCBcInN0cmluZ1wiXS5pbmRleE9mKHR5cGVvZiBhcmcuYXdzX3Nlc3Npb25fdG9rZW4pID4gLTFcbiAgKTtcbn1cblxuaW50ZXJmYWNlIEFzc3VtZVJvbGVQcm9maWxlIGV4dGVuZHMgUHJvZmlsZSB7XG4gIHJvbGVfYXJuOiBzdHJpbmc7XG4gIHNvdXJjZV9wcm9maWxlOiBzdHJpbmc7XG59XG5cbmZ1bmN0aW9uIGlzQXNzdW1lUm9sZVByb2ZpbGUoYXJnOiBhbnkpOiBhcmcgaXMgQXNzdW1lUm9sZVByb2ZpbGUge1xuICByZXR1cm4gKFxuICAgIEJvb2xlYW4oYXJnKSAmJlxuICAgIHR5cGVvZiBhcmcgPT09IFwib2JqZWN0XCIgJiZcbiAgICB0eXBlb2YgYXJnLnJvbGVfYXJuID09PSBcInN0cmluZ1wiICYmXG4gICAgdHlwZW9mIGFyZy5zb3VyY2VfcHJvZmlsZSA9PT0gXCJzdHJpbmdcIiAmJlxuICAgIFtcInVuZGVmaW5lZFwiLCBcInN0cmluZ1wiXS5pbmRleE9mKHR5cGVvZiBhcmcucm9sZV9zZXNzaW9uX25hbWUpID4gLTEgJiZcbiAgICBbXCJ1bmRlZmluZWRcIiwgXCJzdHJpbmdcIl0uaW5kZXhPZih0eXBlb2YgYXJnLmV4dGVybmFsX2lkKSA+IC0xICYmXG4gICAgW1widW5kZWZpbmVkXCIsIFwic3RyaW5nXCJdLmluZGV4T2YodHlwZW9mIGFyZy5tZmFfc2VyaWFsKSA+IC0xXG4gICk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNyZWRlbnRpYWwgcHJvdmlkZXIgdGhhdCB3aWxsIHJlYWQgZnJvbSBpbmkgZmlsZXMgYW5kIHN1cHBvcnRzXG4gKiByb2xlIGFzc3VtcHRpb24gYW5kIG11bHRpLWZhY3RvciBhdXRoZW50aWNhdGlvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZyb21JbmkoaW5pdDogRnJvbUluaUluaXQgPSB7fSk6IENyZWRlbnRpYWxQcm92aWRlciB7XG4gIHJldHVybiAoKSA9PlxuICAgIHBhcnNlS25vd25GaWxlcyhpbml0KS50aGVuKHByb2ZpbGVzID0+XG4gICAgICByZXNvbHZlUHJvZmlsZURhdGEoZ2V0TWFzdGVyUHJvZmlsZU5hbWUoaW5pdCksIHByb2ZpbGVzLCBpbml0KVxuICAgICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNYXN0ZXJQcm9maWxlTmFtZShpbml0OiBGcm9tSW5pSW5pdCk6IHN0cmluZyB7XG4gIHJldHVybiBpbml0LnByb2ZpbGUgfHwgcHJvY2Vzcy5lbnZbRU5WX1BST0ZJTEVdIHx8IERFRkFVTFRfUFJPRklMRTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVzb2x2ZVByb2ZpbGVEYXRhKFxuICBwcm9maWxlTmFtZTogc3RyaW5nLFxuICBwcm9maWxlczogUGFyc2VkSW5pRGF0YSxcbiAgb3B0aW9uczogRnJvbUluaUluaXQsXG4gIHZpc2l0ZWRQcm9maWxlczogeyBbcHJvZmlsZU5hbWU6IHN0cmluZ106IHRydWUgfSA9IHt9XG4pOiBQcm9taXNlPENyZWRlbnRpYWxzPiB7XG4gIGNvbnN0IGRhdGEgPSBwcm9maWxlc1twcm9maWxlTmFtZV07XG5cbiAgLy8gSWYgdGhpcyBpcyBub3QgdGhlIGZpcnN0IHByb2ZpbGUgdmlzaXRlZCwgc3RhdGljIGNyZWRlbnRpYWxzIHNob3VsZCBiZVxuICAvLyBwcmVmZXJyZWQgb3ZlciByb2xlIGFzc3VtcHRpb24gbWV0YWRhdGEuIFRoaXMgc3BlY2lhbCB0cmVhdG1lbnQgb2ZcbiAgLy8gc2Vjb25kIGFuZCBzdWJzZXF1ZW50IGhvcHMgaXMgdG8gZW5zdXJlIGNvbXBhdGliaWxpdHkgd2l0aCB0aGUgQVdTIENMSS5cbiAgaWYgKE9iamVjdC5rZXlzKHZpc2l0ZWRQcm9maWxlcykubGVuZ3RoID4gMCAmJiBpc1N0YXRpY0NyZWRzUHJvZmlsZShkYXRhKSkge1xuICAgIHJldHVybiByZXNvbHZlU3RhdGljQ3JlZGVudGlhbHMoZGF0YSk7XG4gIH1cblxuICAvLyBJZiB0aGlzIGlzIHRoZSBmaXJzdCBwcm9maWxlIHZpc2l0ZWQsIHJvbGUgYXNzdW1wdGlvbiBrZXlzIHNob3VsZCBiZVxuICAvLyBnaXZlbiBwcmVjZWRlbmNlIG92ZXIgc3RhdGljIGNyZWRlbnRpYWxzLlxuICBpZiAoaXNBc3N1bWVSb2xlUHJvZmlsZShkYXRhKSkge1xuICAgIGNvbnN0IHtcbiAgICAgIGV4dGVybmFsX2lkOiBFeHRlcm5hbElkLFxuICAgICAgbWZhX3NlcmlhbCxcbiAgICAgIHJvbGVfYXJuOiBSb2xlQXJuLFxuICAgICAgcm9sZV9zZXNzaW9uX25hbWU6IFJvbGVTZXNzaW9uTmFtZSA9IFwiYXdzLXNkay1qcy1cIiArIERhdGUubm93KCksXG4gICAgICBzb3VyY2VfcHJvZmlsZVxuICAgIH0gPSBkYXRhO1xuXG4gICAgaWYgKCFvcHRpb25zLnJvbGVBc3N1bWVyKSB7XG4gICAgICB0aHJvdyBuZXcgUHJvdmlkZXJFcnJvcihcbiAgICAgICAgYFByb2ZpbGUgJHtwcm9maWxlTmFtZX0gcmVxdWlyZXMgYSByb2xlIHRvIGJlIGFzc3VtZWQsIGJ1dCBub2AgK1xuICAgICAgICAgIGAgcm9sZSBhc3N1bXB0aW9uIGNhbGxiYWNrIHdhcyBwcm92aWRlZC5gLFxuICAgICAgICBmYWxzZVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoc291cmNlX3Byb2ZpbGUgaW4gdmlzaXRlZFByb2ZpbGVzKSB7XG4gICAgICB0aHJvdyBuZXcgUHJvdmlkZXJFcnJvcihcbiAgICAgICAgYERldGVjdGVkIGEgY3ljbGUgYXR0ZW1wdGluZyB0byByZXNvbHZlIGNyZWRlbnRpYWxzIGZvciBwcm9maWxlYCArXG4gICAgICAgICAgYCAke2dldE1hc3RlclByb2ZpbGVOYW1lKG9wdGlvbnMpfS4gUHJvZmlsZXMgdmlzaXRlZDogYCArXG4gICAgICAgICAgT2JqZWN0LmtleXModmlzaXRlZFByb2ZpbGVzKS5qb2luKFwiLCBcIiksXG4gICAgICAgIGZhbHNlXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IHNvdXJjZUNyZWRzID0gcmVzb2x2ZVByb2ZpbGVEYXRhKHNvdXJjZV9wcm9maWxlLCBwcm9maWxlcywgb3B0aW9ucywge1xuICAgICAgLi4udmlzaXRlZFByb2ZpbGVzLFxuICAgICAgW3NvdXJjZV9wcm9maWxlXTogdHJ1ZVxuICAgIH0pO1xuICAgIGNvbnN0IHBhcmFtczogQXNzdW1lUm9sZVBhcmFtcyA9IHsgUm9sZUFybiwgUm9sZVNlc3Npb25OYW1lLCBFeHRlcm5hbElkIH07XG4gICAgaWYgKG1mYV9zZXJpYWwpIHtcbiAgICAgIGlmICghb3B0aW9ucy5tZmFDb2RlUHJvdmlkZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IFByb3ZpZGVyRXJyb3IoXG4gICAgICAgICAgYFByb2ZpbGUgJHtwcm9maWxlTmFtZX0gcmVxdWlyZXMgbXVsdGktZmFjdG9yIGF1dGhlbnRpY2F0aW9uLGAgK1xuICAgICAgICAgICAgYCBidXQgbm8gTUZBIGNvZGUgY2FsbGJhY2sgd2FzIHByb3ZpZGVkLmAsXG4gICAgICAgICAgZmFsc2VcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHBhcmFtcy5TZXJpYWxOdW1iZXIgPSBtZmFfc2VyaWFsO1xuICAgICAgcGFyYW1zLlRva2VuQ29kZSA9IGF3YWl0IG9wdGlvbnMubWZhQ29kZVByb3ZpZGVyKG1mYV9zZXJpYWwpO1xuICAgIH1cblxuICAgIHJldHVybiBvcHRpb25zLnJvbGVBc3N1bWVyKGF3YWl0IHNvdXJjZUNyZWRzLCBwYXJhbXMpO1xuICB9XG5cbiAgLy8gSWYgbm8gcm9sZSBhc3N1bXB0aW9uIG1ldGFkYXRhIGlzIHByZXNlbnQsIGF0dGVtcHQgdG8gbG9hZCBzdGF0aWNcbiAgLy8gY3JlZGVudGlhbHMgZnJvbSB0aGUgc2VsZWN0ZWQgcHJvZmlsZS5cbiAgaWYgKGlzU3RhdGljQ3JlZHNQcm9maWxlKGRhdGEpKSB7XG4gICAgcmV0dXJuIHJlc29sdmVTdGF0aWNDcmVkZW50aWFscyhkYXRhKTtcbiAgfVxuXG4gIC8vIElmIHRoZSBwcm9maWxlIGNhbm5vdCBiZSBwYXJzZWQgb3IgY29udGFpbnMgbmVpdGhlciBzdGF0aWMgY3JlZGVudGlhbHNcbiAgLy8gbm9yIHJvbGUgYXNzdW1wdGlvbiBtZXRhZGF0YSwgdGhyb3cgYW4gZXJyb3IuIFRoaXMgc2hvdWxkIGJlIGNvbnNpZGVyZWQgYVxuICAvLyB0ZXJtaW5hbCByZXNvbHV0aW9uIGVycm9yIGlmIGEgcHJvZmlsZSBoYXMgYmVlbiBzcGVjaWZpZWQgYnkgdGhlIHVzZXJcbiAgLy8gKHdoZXRoZXIgdmlhIGEgcGFyYW1ldGVyLCBhbiBlbnZpcm9ubWVudCB2YXJpYWJsZSwgb3IgYW5vdGhlciBwcm9maWxlJ3NcbiAgLy8gYHNvdXJjZV9wcm9maWxlYCBrZXkpLlxuICB0aHJvdyBuZXcgUHJvdmlkZXJFcnJvcihcbiAgICBgUHJvZmlsZSAke3Byb2ZpbGVOYW1lfSBjb3VsZCBub3QgYmUgZm91bmQgb3IgcGFyc2VkIGluIHNoYXJlZGAgK1xuICAgICAgYCBjcmVkZW50aWFscyBmaWxlLmBcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlS25vd25GaWxlcyhpbml0OiBGcm9tSW5pSW5pdCk6IFByb21pc2U8UGFyc2VkSW5pRGF0YT4ge1xuICBjb25zdCB7IGxvYWRlZENvbmZpZyA9IGxvYWRTaGFyZWRDb25maWdGaWxlcyhpbml0KSB9ID0gaW5pdDtcblxuICByZXR1cm4gbG9hZGVkQ29uZmlnLnRoZW4ocGFyc2VkRmlsZXMgPT4ge1xuICAgIGNvbnN0IHsgY29uZmlnRmlsZSwgY3JlZGVudGlhbHNGaWxlIH0gPSBwYXJzZWRGaWxlcztcbiAgICByZXR1cm4ge1xuICAgICAgLi4uY29uZmlnRmlsZSxcbiAgICAgIC4uLmNyZWRlbnRpYWxzRmlsZVxuICAgIH07XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZXNvbHZlU3RhdGljQ3JlZGVudGlhbHMoXG4gIHByb2ZpbGU6IFN0YXRpY0NyZWRzUHJvZmlsZVxuKTogUHJvbWlzZTxDcmVkZW50aWFscz4ge1xuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHtcbiAgICBhY2Nlc3NLZXlJZDogcHJvZmlsZS5hd3NfYWNjZXNzX2tleV9pZCxcbiAgICBzZWNyZXRBY2Nlc3NLZXk6IHByb2ZpbGUuYXdzX3NlY3JldF9hY2Nlc3Nfa2V5LFxuICAgIHNlc3Npb25Ub2tlbjogcHJvZmlsZS5hd3Nfc2Vzc2lvbl90b2tlblxuICB9KTtcbn1cbiJdfQ==

/***/ }),

/***/ 4091:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const property_provider_1 = __nccwpck_require__(6772);
const credential_provider_env_1 = __nccwpck_require__(7579);
const credential_provider_imds_1 = __nccwpck_require__(3496);
const credential_provider_ini_1 = __nccwpck_require__(6902);
const credential_provider_process_1 = __nccwpck_require__(3711);
exports.ENV_IMDS_DISABLED = "AWS_EC2_METADATA_DISABLED";
/**
 * Creates a credential provider that will attempt to find credentials from the
 * following sources (listed in order of precedence):
 *   * Environment variables exposed via `process.env`
 *   * Shared credentials and config ini files
 *   * The EC2/ECS Instance Metadata Service
 *
 * The default credential provider will invoke one provider at a time and only
 * continue to the next if no credentials have been located. For example, if
 * the process finds values defined via the `AWS_ACCESS_KEY_ID` and
 * `AWS_SECRET_ACCESS_KEY` environment variables, the files at
 * `~/.aws/credentials` and `~/.aws/config` will not be read, nor will any
 * messages be sent to the Instance Metadata Service.
 *
 * @param init                  Configuration that is passed to each individual
 *                              provider
 *
 * @see fromEnv                 The function used to source credentials from
 *                              environment variables
 * @see fromIni                 The function used to source credentials from INI
 *                              files
 * @see fromProcess             The functino used to sources credentials from
 *                              credential_process in INI files
 * @see fromInstanceMetadata    The function used to source credentials from the
 *                              EC2 Instance Metadata Service
 * @see fromContainerMetadata   The function used to source credentials from the
 *                              ECS Container Metadata Service
 */
function defaultProvider(init = {}) {
    const { profile = process.env[credential_provider_ini_1.ENV_PROFILE] } = init;
    const providerChain = profile
        ? credential_provider_ini_1.fromIni(init)
        : property_provider_1.chain(credential_provider_env_1.fromEnv(), credential_provider_ini_1.fromIni(init), credential_provider_process_1.fromProcess(init), remoteProvider(init));
    return property_provider_1.memoize(providerChain, credentials => credentials.expiration !== undefined &&
        credentials.expiration.getTime() - Date.now() < 300000, credentials => credentials.expiration !== undefined);
}
exports.defaultProvider = defaultProvider;
function remoteProvider(init) {
    if (process.env[credential_provider_imds_1.ENV_CMDS_RELATIVE_URI] || process.env[credential_provider_imds_1.ENV_CMDS_FULL_URI]) {
        return credential_provider_imds_1.fromContainerMetadata(init);
    }
    if (process.env[exports.ENV_IMDS_DISABLED]) {
        return () => Promise.reject(new property_provider_1.ProviderError("EC2 Instance Metadata Service access disabled"));
    }
    return credential_provider_imds_1.fromInstanceMetadata(init);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrRUFBMkU7QUFDM0UsOEVBQTJEO0FBQzNELGdGQU0yQztBQUMzQyw4RUFJMEM7QUFDMUMsc0ZBRzhDO0FBR2pDLFFBQUEsaUJBQWlCLEdBQUcsMkJBQTJCLENBQUM7QUFFN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCRztBQUNILFNBQWdCLGVBQWUsQ0FDN0IsT0FBMkQsRUFBRTtJQUU3RCxNQUFNLEVBQUUsT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMscUNBQVcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDO0lBQ3BELE1BQU0sYUFBYSxHQUFHLE9BQU87UUFDM0IsQ0FBQyxDQUFDLGlDQUFPLENBQUMsSUFBSSxDQUFDO1FBQ2YsQ0FBQyxDQUFDLHlCQUFLLENBQUMsaUNBQU8sRUFBRSxFQUFFLGlDQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUseUNBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUU3RSxPQUFPLDJCQUFPLENBQ1osYUFBYSxFQUNiLFdBQVcsQ0FBQyxFQUFFLENBQ1osV0FBVyxDQUFDLFVBQVUsS0FBSyxTQUFTO1FBQ3BDLFdBQVcsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLE1BQU0sRUFDeEQsV0FBVyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsVUFBVSxLQUFLLFNBQVMsQ0FDcEQsQ0FBQztBQUNKLENBQUM7QUFmRCwwQ0FlQztBQUVELFNBQVMsY0FBYyxDQUFDLElBQXdCO0lBQzlDLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxnREFBcUIsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsNENBQWlCLENBQUMsRUFBRTtRQUN4RSxPQUFPLGdEQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3BDO0lBRUQsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUFpQixDQUFDLEVBQUU7UUFDbEMsT0FBTyxHQUFHLEVBQUUsQ0FDVixPQUFPLENBQUMsTUFBTSxDQUNaLElBQUksaUNBQWEsQ0FBQywrQ0FBK0MsQ0FBQyxDQUNuRSxDQUFDO0tBQ0w7SUFFRCxPQUFPLCtDQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3BDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjaGFpbiwgbWVtb2l6ZSwgUHJvdmlkZXJFcnJvciB9IGZyb20gXCJAYXdzLXNkay9wcm9wZXJ0eS1wcm92aWRlclwiO1xuaW1wb3J0IHsgZnJvbUVudiB9IGZyb20gXCJAYXdzLXNkay9jcmVkZW50aWFsLXByb3ZpZGVyLWVudlwiO1xuaW1wb3J0IHtcbiAgRU5WX0NNRFNfRlVMTF9VUkksXG4gIEVOVl9DTURTX1JFTEFUSVZFX1VSSSxcbiAgZnJvbUNvbnRhaW5lck1ldGFkYXRhLFxuICBmcm9tSW5zdGFuY2VNZXRhZGF0YSxcbiAgUmVtb3RlUHJvdmlkZXJJbml0XG59IGZyb20gXCJAYXdzLXNkay9jcmVkZW50aWFsLXByb3ZpZGVyLWltZHNcIjtcbmltcG9ydCB7XG4gIEVOVl9QUk9GSUxFLFxuICBmcm9tSW5pLFxuICBGcm9tSW5pSW5pdFxufSBmcm9tIFwiQGF3cy1zZGsvY3JlZGVudGlhbC1wcm92aWRlci1pbmlcIjtcbmltcG9ydCB7XG4gIGZyb21Qcm9jZXNzLFxuICBGcm9tUHJvY2Vzc0luaXRcbn0gZnJvbSBcIkBhd3Mtc2RrL2NyZWRlbnRpYWwtcHJvdmlkZXItcHJvY2Vzc1wiO1xuaW1wb3J0IHsgQ3JlZGVudGlhbFByb3ZpZGVyIH0gZnJvbSBcIkBhd3Mtc2RrL3R5cGVzXCI7XG5cbmV4cG9ydCBjb25zdCBFTlZfSU1EU19ESVNBQkxFRCA9IFwiQVdTX0VDMl9NRVRBREFUQV9ESVNBQkxFRFwiO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBjcmVkZW50aWFsIHByb3ZpZGVyIHRoYXQgd2lsbCBhdHRlbXB0IHRvIGZpbmQgY3JlZGVudGlhbHMgZnJvbSB0aGVcbiAqIGZvbGxvd2luZyBzb3VyY2VzIChsaXN0ZWQgaW4gb3JkZXIgb2YgcHJlY2VkZW5jZSk6XG4gKiAgICogRW52aXJvbm1lbnQgdmFyaWFibGVzIGV4cG9zZWQgdmlhIGBwcm9jZXNzLmVudmBcbiAqICAgKiBTaGFyZWQgY3JlZGVudGlhbHMgYW5kIGNvbmZpZyBpbmkgZmlsZXNcbiAqICAgKiBUaGUgRUMyL0VDUyBJbnN0YW5jZSBNZXRhZGF0YSBTZXJ2aWNlXG4gKlxuICogVGhlIGRlZmF1bHQgY3JlZGVudGlhbCBwcm92aWRlciB3aWxsIGludm9rZSBvbmUgcHJvdmlkZXIgYXQgYSB0aW1lIGFuZCBvbmx5XG4gKiBjb250aW51ZSB0byB0aGUgbmV4dCBpZiBubyBjcmVkZW50aWFscyBoYXZlIGJlZW4gbG9jYXRlZC4gRm9yIGV4YW1wbGUsIGlmXG4gKiB0aGUgcHJvY2VzcyBmaW5kcyB2YWx1ZXMgZGVmaW5lZCB2aWEgdGhlIGBBV1NfQUNDRVNTX0tFWV9JRGAgYW5kXG4gKiBgQVdTX1NFQ1JFVF9BQ0NFU1NfS0VZYCBlbnZpcm9ubWVudCB2YXJpYWJsZXMsIHRoZSBmaWxlcyBhdFxuICogYH4vLmF3cy9jcmVkZW50aWFsc2AgYW5kIGB+Ly5hd3MvY29uZmlnYCB3aWxsIG5vdCBiZSByZWFkLCBub3Igd2lsbCBhbnlcbiAqIG1lc3NhZ2VzIGJlIHNlbnQgdG8gdGhlIEluc3RhbmNlIE1ldGFkYXRhIFNlcnZpY2UuXG4gKlxuICogQHBhcmFtIGluaXQgICAgICAgICAgICAgICAgICBDb25maWd1cmF0aW9uIHRoYXQgaXMgcGFzc2VkIHRvIGVhY2ggaW5kaXZpZHVhbFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlclxuICpcbiAqIEBzZWUgZnJvbUVudiAgICAgICAgICAgICAgICAgVGhlIGZ1bmN0aW9uIHVzZWQgdG8gc291cmNlIGNyZWRlbnRpYWxzIGZyb21cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW52aXJvbm1lbnQgdmFyaWFibGVzXG4gKiBAc2VlIGZyb21JbmkgICAgICAgICAgICAgICAgIFRoZSBmdW5jdGlvbiB1c2VkIHRvIHNvdXJjZSBjcmVkZW50aWFscyBmcm9tIElOSVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlc1xuICogQHNlZSBmcm9tUHJvY2VzcyAgICAgICAgICAgICBUaGUgZnVuY3Rpbm8gdXNlZCB0byBzb3VyY2VzIGNyZWRlbnRpYWxzIGZyb21cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlZGVudGlhbF9wcm9jZXNzIGluIElOSSBmaWxlc1xuICogQHNlZSBmcm9tSW5zdGFuY2VNZXRhZGF0YSAgICBUaGUgZnVuY3Rpb24gdXNlZCB0byBzb3VyY2UgY3JlZGVudGlhbHMgZnJvbSB0aGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRUMyIEluc3RhbmNlIE1ldGFkYXRhIFNlcnZpY2VcbiAqIEBzZWUgZnJvbUNvbnRhaW5lck1ldGFkYXRhICAgVGhlIGZ1bmN0aW9uIHVzZWQgdG8gc291cmNlIGNyZWRlbnRpYWxzIGZyb20gdGhlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVDUyBDb250YWluZXIgTWV0YWRhdGEgU2VydmljZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdFByb3ZpZGVyKFxuICBpbml0OiBGcm9tSW5pSW5pdCAmIFJlbW90ZVByb3ZpZGVySW5pdCAmIEZyb21Qcm9jZXNzSW5pdCA9IHt9XG4pOiBDcmVkZW50aWFsUHJvdmlkZXIge1xuICBjb25zdCB7IHByb2ZpbGUgPSBwcm9jZXNzLmVudltFTlZfUFJPRklMRV0gfSA9IGluaXQ7XG4gIGNvbnN0IHByb3ZpZGVyQ2hhaW4gPSBwcm9maWxlXG4gICAgPyBmcm9tSW5pKGluaXQpXG4gICAgOiBjaGFpbihmcm9tRW52KCksIGZyb21JbmkoaW5pdCksIGZyb21Qcm9jZXNzKGluaXQpLCByZW1vdGVQcm92aWRlcihpbml0KSk7XG5cbiAgcmV0dXJuIG1lbW9pemUoXG4gICAgcHJvdmlkZXJDaGFpbixcbiAgICBjcmVkZW50aWFscyA9PlxuICAgICAgY3JlZGVudGlhbHMuZXhwaXJhdGlvbiAhPT0gdW5kZWZpbmVkICYmXG4gICAgICBjcmVkZW50aWFscy5leHBpcmF0aW9uLmdldFRpbWUoKSAtIERhdGUubm93KCkgPCAzMDAwMDAsXG4gICAgY3JlZGVudGlhbHMgPT4gY3JlZGVudGlhbHMuZXhwaXJhdGlvbiAhPT0gdW5kZWZpbmVkXG4gICk7XG59XG5cbmZ1bmN0aW9uIHJlbW90ZVByb3ZpZGVyKGluaXQ6IFJlbW90ZVByb3ZpZGVySW5pdCk6IENyZWRlbnRpYWxQcm92aWRlciB7XG4gIGlmIChwcm9jZXNzLmVudltFTlZfQ01EU19SRUxBVElWRV9VUkldIHx8IHByb2Nlc3MuZW52W0VOVl9DTURTX0ZVTExfVVJJXSkge1xuICAgIHJldHVybiBmcm9tQ29udGFpbmVyTWV0YWRhdGEoaW5pdCk7XG4gIH1cblxuICBpZiAocHJvY2Vzcy5lbnZbRU5WX0lNRFNfRElTQUJMRURdKSB7XG4gICAgcmV0dXJuICgpID0+XG4gICAgICBQcm9taXNlLnJlamVjdChcbiAgICAgICAgbmV3IFByb3ZpZGVyRXJyb3IoXCJFQzIgSW5zdGFuY2UgTWV0YWRhdGEgU2VydmljZSBhY2Nlc3MgZGlzYWJsZWRcIilcbiAgICAgICk7XG4gIH1cblxuICByZXR1cm4gZnJvbUluc3RhbmNlTWV0YWRhdGEoaW5pdCk7XG59XG4iXX0=

/***/ }),

/***/ 3711:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var tslib_1 = __nccwpck_require__(4351);
var property_provider_1 = __nccwpck_require__(6772);
var child_process_1 = __nccwpck_require__(3129);
var credential_provider_ini_1 = __nccwpck_require__(6902);
var DEFAULT_PROFILE = "default";
exports.ENV_PROFILE = "AWS_PROFILE";
/**
 * Creates a credential provider that will read from a credential_process specified
 * in ini files.
 */
function fromProcess(init) {
    if (init === void 0) { init = {}; }
    return function () {
        return credential_provider_ini_1.parseKnownFiles(init).then(function (profiles) {
            return resolveProcessCredentials(credential_provider_ini_1.getMasterProfileName(init), profiles, init);
        });
    };
}
exports.fromProcess = fromProcess;
function resolveProcessCredentials(profileName, profiles, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var profile, credentialProcess;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    profile = profiles[profileName];
                    if (!profiles[profileName]) return [3 /*break*/, 4];
                    credentialProcess = profile["credential_process"];
                    if (!(credentialProcess !== undefined)) return [3 /*break*/, 2];
                    return [4 /*yield*/, execPromise(credentialProcess)
                            .then(function (processResult) {
                            var data;
                            try {
                                data = JSON.parse(processResult);
                            }
                            catch (_a) {
                                throw Error("Profile " + profileName + " credential_process returned invalid JSON.");
                            }
                            var version = data.Version, accessKeyId = data.AccessKeyId, secretAccessKey = data.SecretAccessKey, sessionToken = data.SessionToken, expiration = data.Expiration;
                            if (version !== 1) {
                                throw Error("Profile " + profileName + " credential_process did not return Version 1.");
                            }
                            if (accessKeyId === undefined || secretAccessKey === undefined) {
                                throw Error("Profile " + profileName + " credential_process returned invalid credentials.");
                            }
                            var expirationUnix;
                            if (expiration) {
                                var currentTime = new Date();
                                var expireTime = new Date(expiration);
                                if (expireTime < currentTime) {
                                    throw Error("Profile " + profileName + " credential_process returned expired credentials.");
                                }
                                expirationUnix = Math.floor(new Date(expiration).valueOf() / 1000);
                            }
                            return {
                                accessKeyId: accessKeyId,
                                secretAccessKey: secretAccessKey,
                                sessionToken: sessionToken,
                                expirationUnix: expirationUnix
                            };
                        })
                            .catch(function (error) {
                            throw new property_provider_1.ProviderError(error.message);
                        })];
                case 1: return [2 /*return*/, _a.sent()];
                case 2: throw new property_provider_1.ProviderError("Profile " + profileName + " did not contain credential_process.");
                case 3: return [3 /*break*/, 5];
                case 4: 
                // If the profile cannot be parsed or does not contain the default or
                // specified profile throw an error. This should be considered a terminal
                // resolution error if a profile has been specified by the user (whether via
                // a parameter, anenvironment variable, or another profile's `source_profile` key).
                throw new property_provider_1.ProviderError("Profile " + profileName + " could not be found in shared credentials file.");
                case 5: return [2 /*return*/];
            }
        });
    });
}
function execPromise(command) {
    return new Promise(function (resolve, reject) {
        child_process_1.exec(command, function (error, stdout, stderr) {
            if (error) {
                reject(error);
                return;
            }
            resolve(stdout.trim());
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxnRUFBMkQ7QUFPM0QsK0NBQXFDO0FBQ3JDLDRFQUcwQztBQUUxQyxJQUFNLGVBQWUsR0FBRyxTQUFTLENBQUM7QUFDckIsUUFBQSxXQUFXLEdBQUcsYUFBYSxDQUFDO0FBZXpDOzs7R0FHRztBQUNILFNBQWdCLFdBQVcsQ0FBQyxJQUEwQjtJQUExQixxQkFBQSxFQUFBLFNBQTBCO0lBQ3BELE9BQU87UUFDTCxPQUFBLHlDQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsUUFBUTtZQUNqQyxPQUFBLHlCQUF5QixDQUFDLDhDQUFvQixDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUM7UUFBckUsQ0FBcUUsQ0FDdEU7SUFGRCxDQUVDLENBQUM7QUFDTixDQUFDO0FBTEQsa0NBS0M7QUFFRCxTQUFlLHlCQUF5QixDQUN0QyxXQUFtQixFQUNuQixRQUF1QixFQUN2QixPQUF3Qjs7Ozs7O29CQUVsQixPQUFPLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO3lCQUVsQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQXJCLHdCQUFxQjtvQkFDakIsaUJBQWlCLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7eUJBQ3BELENBQUEsaUJBQWlCLEtBQUssU0FBUyxDQUFBLEVBQS9CLHdCQUErQjtvQkFDMUIscUJBQU0sV0FBVyxDQUFDLGlCQUFpQixDQUFDOzZCQUN4QyxJQUFJLENBQUMsVUFBQyxhQUFrQjs0QkFDdkIsSUFBSSxJQUFJLENBQUM7NEJBQ1QsSUFBSTtnQ0FDRixJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQzs2QkFDbEM7NEJBQUMsV0FBTTtnQ0FDTixNQUFNLEtBQUssQ0FDVCxhQUFXLFdBQVcsK0NBQTRDLENBQ25FLENBQUM7NkJBQ0g7NEJBR0MsSUFBQSxzQkFBZ0IsRUFDaEIsOEJBQXdCLEVBQ3hCLHNDQUFnQyxFQUNoQyxnQ0FBMEIsRUFDMUIsNEJBQXNCLENBQ2Y7NEJBRVQsSUFBSSxPQUFPLEtBQUssQ0FBQyxFQUFFO2dDQUNqQixNQUFNLEtBQUssQ0FDVCxhQUFXLFdBQVcsa0RBQStDLENBQ3RFLENBQUM7NkJBQ0g7NEJBRUQsSUFBSSxXQUFXLEtBQUssU0FBUyxJQUFJLGVBQWUsS0FBSyxTQUFTLEVBQUU7Z0NBQzlELE1BQU0sS0FBSyxDQUNULGFBQVcsV0FBVyxzREFBbUQsQ0FDMUUsQ0FBQzs2QkFDSDs0QkFFRCxJQUFJLGNBQWMsQ0FBQzs0QkFFbkIsSUFBSSxVQUFVLEVBQUU7Z0NBQ2QsSUFBTSxXQUFXLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztnQ0FDL0IsSUFBTSxVQUFVLEdBQUcsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7Z0NBQ3hDLElBQUksVUFBVSxHQUFHLFdBQVcsRUFBRTtvQ0FDNUIsTUFBTSxLQUFLLENBQ1QsYUFBVyxXQUFXLHNEQUFtRCxDQUMxRSxDQUFDO2lDQUNIO2dDQUNELGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDOzZCQUNwRTs0QkFFRCxPQUFPO2dDQUNMLFdBQVcsYUFBQTtnQ0FDWCxlQUFlLGlCQUFBO2dDQUNmLFlBQVksY0FBQTtnQ0FDWixjQUFjLGdCQUFBOzZCQUNmLENBQUM7d0JBQ0osQ0FBQyxDQUFDOzZCQUNELEtBQUssQ0FBQyxVQUFDLEtBQVk7NEJBQ2xCLE1BQU0sSUFBSSxpQ0FBYSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDekMsQ0FBQyxDQUFDLEVBQUE7d0JBckRKLHNCQUFPLFNBcURILEVBQUM7d0JBRUwsTUFBTSxJQUFJLGlDQUFhLENBQ3JCLGFBQVcsV0FBVyx5Q0FBc0MsQ0FDN0QsQ0FBQzs7O2dCQUdKLHFFQUFxRTtnQkFDckUseUVBQXlFO2dCQUN6RSw0RUFBNEU7Z0JBQzVFLG1GQUFtRjtnQkFDbkYsTUFBTSxJQUFJLGlDQUFhLENBQ3JCLGFBQVcsV0FBVyxvREFBaUQsQ0FDeEUsQ0FBQzs7Ozs7Q0FFTDtBQUVELFNBQVMsV0FBVyxDQUFDLE9BQWU7SUFDbEMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFVLE9BQU8sRUFBRSxNQUFNO1FBQzFDLG9CQUFJLENBQUMsT0FBTyxFQUFFLFVBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNO1lBQ2xDLElBQUksS0FBSyxFQUFFO2dCQUNULE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDZCxPQUFPO2FBQ1I7WUFFRCxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDcmVkZW50aWFsUHJvdmlkZXIsIENyZWRlbnRpYWxzIH0gZnJvbSBcIkBhd3Mtc2RrL3R5cGVzXCI7XG5pbXBvcnQgeyBQcm92aWRlckVycm9yIH0gZnJvbSBcIkBhd3Mtc2RrL3Byb3BlcnR5LXByb3ZpZGVyXCI7XG5pbXBvcnQge1xuICBsb2FkU2hhcmVkQ29uZmlnRmlsZXMsXG4gIFBhcnNlZEluaURhdGEsXG4gIFNoYXJlZENvbmZpZ0ZpbGVzLFxuICBTaGFyZWRDb25maWdJbml0XG59IGZyb20gXCJAYXdzLXNkay9zaGFyZWQtaW5pLWZpbGUtbG9hZGVyXCI7XG5pbXBvcnQgeyBleGVjIH0gZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcbmltcG9ydCB7XG4gIGdldE1hc3RlclByb2ZpbGVOYW1lLFxuICBwYXJzZUtub3duRmlsZXNcbn0gZnJvbSBcIkBhd3Mtc2RrL2NyZWRlbnRpYWwtcHJvdmlkZXItaW5pXCI7XG5cbmNvbnN0IERFRkFVTFRfUFJPRklMRSA9IFwiZGVmYXVsdFwiO1xuZXhwb3J0IGNvbnN0IEVOVl9QUk9GSUxFID0gXCJBV1NfUFJPRklMRVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZyb21Qcm9jZXNzSW5pdCBleHRlbmRzIFNoYXJlZENvbmZpZ0luaXQge1xuICAvKipcbiAgICogVGhlIGNvbmZpZ3VyYXRpb24gcHJvZmlsZSB0byB1c2UuXG4gICAqL1xuICBwcm9maWxlPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBIHByb21pc2UgdGhhdCB3aWxsIGJlIHJlc29sdmVkIHdpdGggbG9hZGVkIGFuZCBwYXJzZWQgY3JlZGVudGlhbHMgZmlsZXMuXG4gICAqIFVzZWQgdG8gYXZvaWQgbG9hZGluZyBzaGFyZWQgY29uZmlnIGZpbGVzIG11bHRpcGxlIHRpbWVzLlxuICAgKi9cbiAgbG9hZGVkQ29uZmlnPzogUHJvbWlzZTxTaGFyZWRDb25maWdGaWxlcz47XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNyZWRlbnRpYWwgcHJvdmlkZXIgdGhhdCB3aWxsIHJlYWQgZnJvbSBhIGNyZWRlbnRpYWxfcHJvY2VzcyBzcGVjaWZpZWRcbiAqIGluIGluaSBmaWxlcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZyb21Qcm9jZXNzKGluaXQ6IEZyb21Qcm9jZXNzSW5pdCA9IHt9KTogQ3JlZGVudGlhbFByb3ZpZGVyIHtcbiAgcmV0dXJuICgpID0+XG4gICAgcGFyc2VLbm93bkZpbGVzKGluaXQpLnRoZW4ocHJvZmlsZXMgPT5cbiAgICAgIHJlc29sdmVQcm9jZXNzQ3JlZGVudGlhbHMoZ2V0TWFzdGVyUHJvZmlsZU5hbWUoaW5pdCksIHByb2ZpbGVzLCBpbml0KVxuICAgICk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlc29sdmVQcm9jZXNzQ3JlZGVudGlhbHMoXG4gIHByb2ZpbGVOYW1lOiBzdHJpbmcsXG4gIHByb2ZpbGVzOiBQYXJzZWRJbmlEYXRhLFxuICBvcHRpb25zOiBGcm9tUHJvY2Vzc0luaXRcbik6IFByb21pc2U8Q3JlZGVudGlhbHM+IHtcbiAgY29uc3QgcHJvZmlsZSA9IHByb2ZpbGVzW3Byb2ZpbGVOYW1lXTtcblxuICBpZiAocHJvZmlsZXNbcHJvZmlsZU5hbWVdKSB7XG4gICAgY29uc3QgY3JlZGVudGlhbFByb2Nlc3MgPSBwcm9maWxlW1wiY3JlZGVudGlhbF9wcm9jZXNzXCJdO1xuICAgIGlmIChjcmVkZW50aWFsUHJvY2VzcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gYXdhaXQgZXhlY1Byb21pc2UoY3JlZGVudGlhbFByb2Nlc3MpXG4gICAgICAgIC50aGVuKChwcm9jZXNzUmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICBsZXQgZGF0YTtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UocHJvY2Vzc1Jlc3VsdCk7XG4gICAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICAgICAgYFByb2ZpbGUgJHtwcm9maWxlTmFtZX0gY3JlZGVudGlhbF9wcm9jZXNzIHJldHVybmVkIGludmFsaWQgSlNPTi5gXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIFZlcnNpb246IHZlcnNpb24sXG4gICAgICAgICAgICBBY2Nlc3NLZXlJZDogYWNjZXNzS2V5SWQsXG4gICAgICAgICAgICBTZWNyZXRBY2Nlc3NLZXk6IHNlY3JldEFjY2Vzc0tleSxcbiAgICAgICAgICAgIFNlc3Npb25Ub2tlbjogc2Vzc2lvblRva2VuLFxuICAgICAgICAgICAgRXhwaXJhdGlvbjogZXhwaXJhdGlvblxuICAgICAgICAgIH0gPSBkYXRhO1xuXG4gICAgICAgICAgaWYgKHZlcnNpb24gIT09IDEpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgICAgICBgUHJvZmlsZSAke3Byb2ZpbGVOYW1lfSBjcmVkZW50aWFsX3Byb2Nlc3MgZGlkIG5vdCByZXR1cm4gVmVyc2lvbiAxLmBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGFjY2Vzc0tleUlkID09PSB1bmRlZmluZWQgfHwgc2VjcmV0QWNjZXNzS2V5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgICAgICBgUHJvZmlsZSAke3Byb2ZpbGVOYW1lfSBjcmVkZW50aWFsX3Byb2Nlc3MgcmV0dXJuZWQgaW52YWxpZCBjcmVkZW50aWFscy5gXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGxldCBleHBpcmF0aW9uVW5peDtcblxuICAgICAgICAgIGlmIChleHBpcmF0aW9uKSB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VGltZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICBjb25zdCBleHBpcmVUaW1lID0gbmV3IERhdGUoZXhwaXJhdGlvbik7XG4gICAgICAgICAgICBpZiAoZXhwaXJlVGltZSA8IGN1cnJlbnRUaW1lKSB7XG4gICAgICAgICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgICAgICAgIGBQcm9maWxlICR7cHJvZmlsZU5hbWV9IGNyZWRlbnRpYWxfcHJvY2VzcyByZXR1cm5lZCBleHBpcmVkIGNyZWRlbnRpYWxzLmBcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGV4cGlyYXRpb25Vbml4ID0gTWF0aC5mbG9vcihuZXcgRGF0ZShleHBpcmF0aW9uKS52YWx1ZU9mKCkgLyAxMDAwKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYWNjZXNzS2V5SWQsXG4gICAgICAgICAgICBzZWNyZXRBY2Nlc3NLZXksXG4gICAgICAgICAgICBzZXNzaW9uVG9rZW4sXG4gICAgICAgICAgICBleHBpcmF0aW9uVW5peFxuICAgICAgICAgIH07XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3I6IEVycm9yKSA9PiB7XG4gICAgICAgICAgdGhyb3cgbmV3IFByb3ZpZGVyRXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgUHJvdmlkZXJFcnJvcihcbiAgICAgICAgYFByb2ZpbGUgJHtwcm9maWxlTmFtZX0gZGlkIG5vdCBjb250YWluIGNyZWRlbnRpYWxfcHJvY2Vzcy5gXG4gICAgICApO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBJZiB0aGUgcHJvZmlsZSBjYW5ub3QgYmUgcGFyc2VkIG9yIGRvZXMgbm90IGNvbnRhaW4gdGhlIGRlZmF1bHQgb3JcbiAgICAvLyBzcGVjaWZpZWQgcHJvZmlsZSB0aHJvdyBhbiBlcnJvci4gVGhpcyBzaG91bGQgYmUgY29uc2lkZXJlZCBhIHRlcm1pbmFsXG4gICAgLy8gcmVzb2x1dGlvbiBlcnJvciBpZiBhIHByb2ZpbGUgaGFzIGJlZW4gc3BlY2lmaWVkIGJ5IHRoZSB1c2VyICh3aGV0aGVyIHZpYVxuICAgIC8vIGEgcGFyYW1ldGVyLCBhbmVudmlyb25tZW50IHZhcmlhYmxlLCBvciBhbm90aGVyIHByb2ZpbGUncyBgc291cmNlX3Byb2ZpbGVgIGtleSkuXG4gICAgdGhyb3cgbmV3IFByb3ZpZGVyRXJyb3IoXG4gICAgICBgUHJvZmlsZSAke3Byb2ZpbGVOYW1lfSBjb3VsZCBub3QgYmUgZm91bmQgaW4gc2hhcmVkIGNyZWRlbnRpYWxzIGZpbGUuYFxuICAgICk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZXhlY1Byb21pc2UoY29tbWFuZDogc3RyaW5nKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgZXhlYyhjb21tYW5kLCAoZXJyb3IsIHN0ZG91dCwgc3RkZXJyKSA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICByZXNvbHZlKHN0ZG91dC50cmltKCkpO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==

/***/ }),

/***/ 5809:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var tslib_1 = __nccwpck_require__(4351);
/**
 * An error representing a failure of an individual credential provider.
 *
 * This error class has special meaning to the {@link chain} method. If a
 * provider in the chain is rejected with an error, the chain will only proceed
 * to the next provider if the value of the `tryNextLink` property on the error
 * is truthy. This allows individual providers to halt the chain and also
 * ensures the chain will stop if an entirely unexpected error is encountered.
 */
var ProviderError = /** @class */ (function (_super) {
    tslib_1.__extends(ProviderError, _super);
    function ProviderError(message, tryNextLink) {
        if (tryNextLink === void 0) { tryNextLink = true; }
        var _this = _super.call(this, message) || this;
        _this.tryNextLink = tryNextLink;
        return _this;
    }
    return ProviderError;
}(Error));
exports.ProviderError = ProviderError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvdmlkZXJFcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Qcm92aWRlckVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBOzs7Ozs7OztHQVFHO0FBQ0g7SUFBbUMseUNBQUs7SUFDdEMsdUJBQVksT0FBZSxFQUFrQixXQUEyQjtRQUEzQiw0QkFBQSxFQUFBLGtCQUEyQjtRQUF4RSxZQUNFLGtCQUFNLE9BQU8sQ0FBQyxTQUNmO1FBRjRDLGlCQUFXLEdBQVgsV0FBVyxDQUFnQjs7SUFFeEUsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FBQyxBQUpELENBQW1DLEtBQUssR0FJdkM7QUFKWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNoYWluIH0gZnJvbSBcIi4vY2hhaW5cIjtcblxuLyoqXG4gKiBBbiBlcnJvciByZXByZXNlbnRpbmcgYSBmYWlsdXJlIG9mIGFuIGluZGl2aWR1YWwgY3JlZGVudGlhbCBwcm92aWRlci5cbiAqXG4gKiBUaGlzIGVycm9yIGNsYXNzIGhhcyBzcGVjaWFsIG1lYW5pbmcgdG8gdGhlIHtAbGluayBjaGFpbn0gbWV0aG9kLiBJZiBhXG4gKiBwcm92aWRlciBpbiB0aGUgY2hhaW4gaXMgcmVqZWN0ZWQgd2l0aCBhbiBlcnJvciwgdGhlIGNoYWluIHdpbGwgb25seSBwcm9jZWVkXG4gKiB0byB0aGUgbmV4dCBwcm92aWRlciBpZiB0aGUgdmFsdWUgb2YgdGhlIGB0cnlOZXh0TGlua2AgcHJvcGVydHkgb24gdGhlIGVycm9yXG4gKiBpcyB0cnV0aHkuIFRoaXMgYWxsb3dzIGluZGl2aWR1YWwgcHJvdmlkZXJzIHRvIGhhbHQgdGhlIGNoYWluIGFuZCBhbHNvXG4gKiBlbnN1cmVzIHRoZSBjaGFpbiB3aWxsIHN0b3AgaWYgYW4gZW50aXJlbHkgdW5leHBlY3RlZCBlcnJvciBpcyBlbmNvdW50ZXJlZC5cbiAqL1xuZXhwb3J0IGNsYXNzIFByb3ZpZGVyRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZywgcHVibGljIHJlYWRvbmx5IHRyeU5leHRMaW5rOiBib29sZWFuID0gdHJ1ZSkge1xuICAgIHN1cGVyKG1lc3NhZ2UpO1xuICB9XG59XG4iXX0=

/***/ }),

/***/ 6364:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var tslib_1 = __nccwpck_require__(4351);
var ProviderError_1 = __nccwpck_require__(5809);
/**
 * Compose a single credential provider function from multiple credential
 * providers. The first provider in the argument list will always be invoked;
 * subsequent providers in the list will be invoked in the order in which the
 * were received if the preceding provider did not successfully resolve.
 *
 * If no providers were received or no provider resolves successfully, the
 * returned promise will be rejected.
 */
function chain() {
    var providers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        providers[_i] = arguments[_i];
    }
    return function () {
        var e_1, _a;
        var promise = Promise.reject(new ProviderError_1.ProviderError("No providers in chain"));
        var _loop_1 = function (provider) {
            promise = promise.catch(function (err) {
                if (err === null || err === void 0 ? void 0 : err.tryNextLink) {
                    return provider();
                }
                throw err;
            });
        };
        try {
            for (var providers_1 = tslib_1.__values(providers), providers_1_1 = providers_1.next(); !providers_1_1.done; providers_1_1 = providers_1.next()) {
                var provider = providers_1_1.value;
                _loop_1(provider);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (providers_1_1 && !providers_1_1.done && (_a = providers_1.return)) _a.call(providers_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return promise;
    };
}
exports.chain = chain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY2hhaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaURBQWdEO0FBR2hEOzs7Ozs7OztHQVFHO0FBQ0gsU0FBZ0IsS0FBSztJQUFJLG1CQUFnQztTQUFoQyxVQUFnQyxFQUFoQyxxQkFBZ0MsRUFBaEMsSUFBZ0M7UUFBaEMsOEJBQWdDOztJQUN2RCxPQUFPOztRQUNMLElBQUksT0FBTyxHQUFlLE9BQU8sQ0FBQyxNQUFNLENBQ3RDLElBQUksNkJBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUMzQyxDQUFDO2dDQUNTLFFBQVE7WUFDakIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBQyxHQUFRO2dCQUMvQixJQUFJLEdBQUcsYUFBSCxHQUFHLHVCQUFILEdBQUcsQ0FBRSxXQUFXLEVBQUU7b0JBQ3BCLE9BQU8sUUFBUSxFQUFFLENBQUM7aUJBQ25CO2dCQUVELE1BQU0sR0FBRyxDQUFDO1lBQ1osQ0FBQyxDQUFDLENBQUM7OztZQVBMLEtBQXVCLElBQUEsY0FBQSxpQkFBQSxTQUFTLENBQUEsb0NBQUE7Z0JBQTNCLElBQU0sUUFBUSxzQkFBQTt3QkFBUixRQUFRO2FBUWxCOzs7Ozs7Ozs7UUFFRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDLENBQUM7QUFDSixDQUFDO0FBakJELHNCQWlCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByb3ZpZGVyRXJyb3IgfSBmcm9tIFwiLi9Qcm92aWRlckVycm9yXCI7XG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gXCJAYXdzLXNkay90eXBlc1wiO1xuXG4vKipcbiAqIENvbXBvc2UgYSBzaW5nbGUgY3JlZGVudGlhbCBwcm92aWRlciBmdW5jdGlvbiBmcm9tIG11bHRpcGxlIGNyZWRlbnRpYWxcbiAqIHByb3ZpZGVycy4gVGhlIGZpcnN0IHByb3ZpZGVyIGluIHRoZSBhcmd1bWVudCBsaXN0IHdpbGwgYWx3YXlzIGJlIGludm9rZWQ7XG4gKiBzdWJzZXF1ZW50IHByb3ZpZGVycyBpbiB0aGUgbGlzdCB3aWxsIGJlIGludm9rZWQgaW4gdGhlIG9yZGVyIGluIHdoaWNoIHRoZVxuICogd2VyZSByZWNlaXZlZCBpZiB0aGUgcHJlY2VkaW5nIHByb3ZpZGVyIGRpZCBub3Qgc3VjY2Vzc2Z1bGx5IHJlc29sdmUuXG4gKlxuICogSWYgbm8gcHJvdmlkZXJzIHdlcmUgcmVjZWl2ZWQgb3Igbm8gcHJvdmlkZXIgcmVzb2x2ZXMgc3VjY2Vzc2Z1bGx5LCB0aGVcbiAqIHJldHVybmVkIHByb21pc2Ugd2lsbCBiZSByZWplY3RlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNoYWluPFQ+KC4uLnByb3ZpZGVyczogQXJyYXk8UHJvdmlkZXI8VD4+KTogUHJvdmlkZXI8VD4ge1xuICByZXR1cm4gKCkgPT4ge1xuICAgIGxldCBwcm9taXNlOiBQcm9taXNlPFQ+ID0gUHJvbWlzZS5yZWplY3QoXG4gICAgICBuZXcgUHJvdmlkZXJFcnJvcihcIk5vIHByb3ZpZGVycyBpbiBjaGFpblwiKVxuICAgICk7XG4gICAgZm9yIChjb25zdCBwcm92aWRlciBvZiBwcm92aWRlcnMpIHtcbiAgICAgIHByb21pc2UgPSBwcm9taXNlLmNhdGNoKChlcnI6IGFueSkgPT4ge1xuICAgICAgICBpZiAoZXJyPy50cnlOZXh0TGluaykge1xuICAgICAgICAgIHJldHVybiBwcm92aWRlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH07XG59XG4iXX0=

/***/ }),

/***/ 215:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function fromStatic(staticValue) {
    var promisified = Promise.resolve(staticValue);
    return function () { return promisified; };
}
exports.fromStatic = fromStatic;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbVN0YXRpYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9mcm9tU3RhdGljLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsU0FBZ0IsVUFBVSxDQUFJLFdBQWM7SUFDMUMsSUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNqRCxPQUFPLGNBQU0sT0FBQSxXQUFXLEVBQVgsQ0FBVyxDQUFDO0FBQzNCLENBQUM7QUFIRCxnQ0FHQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSBcIkBhd3Mtc2RrL3R5cGVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tU3RhdGljPFQ+KHN0YXRpY1ZhbHVlOiBUKTogUHJvdmlkZXI8VD4ge1xuICBjb25zdCBwcm9taXNpZmllZCA9IFByb21pc2UucmVzb2x2ZShzdGF0aWNWYWx1ZSk7XG4gIHJldHVybiAoKSA9PiBwcm9taXNpZmllZDtcbn1cbiJdfQ==

/***/ }),

/***/ 6772:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var tslib_1 = __nccwpck_require__(4351);
tslib_1.__exportStar(__nccwpck_require__(6364), exports);
tslib_1.__exportStar(__nccwpck_require__(215), exports);
tslib_1.__exportStar(__nccwpck_require__(4894), exports);
tslib_1.__exportStar(__nccwpck_require__(5809), exports);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsa0RBQXdCO0FBQ3hCLHVEQUE2QjtBQUM3QixvREFBMEI7QUFDMUIsMERBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0ICogZnJvbSBcIi4vY2hhaW5cIjtcbmV4cG9ydCAqIGZyb20gXCIuL2Zyb21TdGF0aWNcIjtcbmV4cG9ydCAqIGZyb20gXCIuL21lbW9pemVcIjtcbmV4cG9ydCAqIGZyb20gXCIuL1Byb3ZpZGVyRXJyb3JcIjtcbiJdfQ==

/***/ }),

/***/ 4894:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function memoize(provider, isExpired, requiresRefresh) {
    if (isExpired === undefined) {
        // This is a static memoization; no need to incorporate refreshing
        var result_1 = provider();
        return function () { return result_1; };
    }
    var result = provider();
    var isConstant = false;
    return function () {
        if (isConstant) {
            return result;
        }
        return result.then(function (resolved) {
            if (requiresRefresh && !requiresRefresh(resolved)) {
                isConstant = true;
                return resolved;
            }
            if (isExpired(resolved)) {
                return (result = provider());
            }
            return resolved;
        });
    };
}
exports.memoize = memoize;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtb2l6ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tZW1vaXplLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBd0NBLFNBQWdCLE9BQU8sQ0FDckIsUUFBcUIsRUFDckIsU0FBb0MsRUFDcEMsZUFBMEM7SUFFMUMsSUFBSSxTQUFTLEtBQUssU0FBUyxFQUFFO1FBQzNCLGtFQUFrRTtRQUNsRSxJQUFNLFFBQU0sR0FBRyxRQUFRLEVBQUUsQ0FBQztRQUMxQixPQUFPLGNBQU0sT0FBQSxRQUFNLEVBQU4sQ0FBTSxDQUFDO0tBQ3JCO0lBRUQsSUFBSSxNQUFNLEdBQUcsUUFBUSxFQUFFLENBQUM7SUFDeEIsSUFBSSxVQUFVLEdBQVksS0FBSyxDQUFDO0lBRWhDLE9BQU87UUFDTCxJQUFJLFVBQVUsRUFBRTtZQUNkLE9BQU8sTUFBTSxDQUFDO1NBQ2Y7UUFFRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBQSxRQUFRO1lBQ3pCLElBQUksZUFBZSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUNqRCxVQUFVLEdBQUcsSUFBSSxDQUFDO2dCQUNsQixPQUFPLFFBQVEsQ0FBQzthQUNqQjtZQUVELElBQUksU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUN2QixPQUFPLENBQUMsTUFBTSxHQUFHLFFBQVEsRUFBRSxDQUFDLENBQUM7YUFDOUI7WUFFRCxPQUFPLFFBQVEsQ0FBQztRQUNsQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQztBQUNKLENBQUM7QUFoQ0QsMEJBZ0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tIFwiQGF3cy1zZGsvdHlwZXNcIjtcblxuLyoqXG4gKlxuICogRGVjb3JhdGVzIGEgcHJvdmlkZXIgZnVuY3Rpb24gd2l0aCBlaXRoZXIgc3RhdGljIG1lbW9pemF0aW9uLlxuICpcbiAqIFRvIGNyZWF0ZSBhIHN0YXRpY2FsbHkgbWVtb2l6ZWQgcHJvdmlkZXIsIHN1cHBseSBhIHByb3ZpZGVyIGFzIHRoZSBvbmx5XG4gKiBhcmd1bWVudCB0byB0aGlzIGZ1bmN0aW9uLiBUaGUgcHJvdmlkZXIgd2lsbCBiZSBpbnZva2VkIG9uY2UsIGFuZCBhbGxcbiAqIGludm9jYXRpb25zIG9mIHRoZSBwcm92aWRlciByZXR1cm5lZCBieSBgbWVtb2l6ZWAgd2lsbCByZXR1cm4gdGhlIHNhbWVcbiAqIHByb21pc2Ugb2JqZWN0LlxuICpcbiAqIEBwYXJhbSBwcm92aWRlciBUaGUgcHJvdmlkZXIgd2hvc2UgcmVzdWx0IHNob3VsZCBiZSBjYWNoZWQgaW5kZWZpbml0ZWx5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gbWVtb2l6ZTxUPihwcm92aWRlcjogUHJvdmlkZXI8VD4pOiBQcm92aWRlcjxUPjtcblxuLyoqXG4gKiBEZWNvcmF0ZXMgYSBwcm92aWRlciBmdW5jdGlvbiB3aXRoIHJlZnJlc2hpbmcgbWVtb2l6YXRpb24uXG4gKlxuICogQHBhcmFtIHByb3ZpZGVyICAgICAgICAgIFRoZSBwcm92aWRlciB3aG9zZSByZXN1bHQgc2hvdWxkIGJlIGNhY2hlZC5cbiAqIEBwYXJhbSBpc0V4cGlyZWQgICAgICAgICBBIGZ1bmN0aW9uIHRoYXQgd2lsbCBldmFsdWF0ZSB0aGUgcmVzb2x2ZWQgdmFsdWUgYW5kXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0ZXJtaW5lIGlmIGl0IGlzIGV4cGlyZWQuIEZvciBleGFtcGxlLCB3aGVuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgbWVtb2l6aW5nIEFXUyBjcmVkZW50aWFsIHByb3ZpZGVycywgdGhpcyBmdW5jdGlvblxuICogICAgICAgICAgICAgICAgICAgICAgICAgIHNob3VsZCByZXR1cm4gYHRydWVgIHdoZW4gdGhlIGNyZWRlbnRpYWwnc1xuICogICAgICAgICAgICAgICAgICAgICAgICAgIGV4cGlyYXRpb24gaXMgaW4gdGhlIHBhc3QgKG9yIHZlcnkgbmVhciBmdXR1cmUpIGFuZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgIGBmYWxzZWAgb3RoZXJ3aXNlLlxuICogQHBhcmFtIHJlcXVpcmVzUmVmcmVzaCAgIEEgZnVuY3Rpb24gdGhhdCB3aWxsIGV2YWx1YXRlIHRoZSByZXNvbHZlZCB2YWx1ZSBhbmRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRlcm1pbmUgaWYgaXQgcmVwcmVzZW50cyBzdGF0aWMgdmFsdWUgb3Igb25lIHRoYXRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICB3aWxsIGV2ZW50dWFsbHkgbmVlZCB0byBiZSByZWZyZXNoZWQuIEZvciBleGFtcGxlLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgIEFXUyBjcmVkZW50aWFscyB0aGF0IGhhdmUgbm8gZGVmaW5lZCBleHBpcmF0aW9uIHdpbGxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICBuZXZlciBuZWVkIHRvIGJlIHJlZnJlc2hlZCwgc28gdGhpcyBmdW5jdGlvbiB3b3VsZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgdHJ1ZWAgaWYgdGhlIGNyZWRlbnRpYWxzIHJlc29sdmVkIGJ5IHRoZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgIHVuZGVybHlpbmcgcHJvdmlkZXIgaGFkIGFuIGV4cGlyYXRpb24gYW5kIGBmYWxzZWBcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcndpc2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtZW1vaXplPFQ+KFxuICBwcm92aWRlcjogUHJvdmlkZXI8VD4sXG4gIGlzRXhwaXJlZDogKHJlc29sdmVkOiBUKSA9PiBib29sZWFuLFxuICByZXF1aXJlc1JlZnJlc2g/OiAocmVzb2x2ZWQ6IFQpID0+IGJvb2xlYW5cbik6IFByb3ZpZGVyPFQ+O1xuXG5leHBvcnQgZnVuY3Rpb24gbWVtb2l6ZTxUPihcbiAgcHJvdmlkZXI6IFByb3ZpZGVyPFQ+LFxuICBpc0V4cGlyZWQ/OiAocmVzb2x2ZWQ6IFQpID0+IGJvb2xlYW4sXG4gIHJlcXVpcmVzUmVmcmVzaD86IChyZXNvbHZlZDogVCkgPT4gYm9vbGVhblxuKTogUHJvdmlkZXI8VD4ge1xuICBpZiAoaXNFeHBpcmVkID09PSB1bmRlZmluZWQpIHtcbiAgICAvLyBUaGlzIGlzIGEgc3RhdGljIG1lbW9pemF0aW9uOyBubyBuZWVkIHRvIGluY29ycG9yYXRlIHJlZnJlc2hpbmdcbiAgICBjb25zdCByZXN1bHQgPSBwcm92aWRlcigpO1xuICAgIHJldHVybiAoKSA9PiByZXN1bHQ7XG4gIH1cblxuICBsZXQgcmVzdWx0ID0gcHJvdmlkZXIoKTtcbiAgbGV0IGlzQ29uc3RhbnQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICByZXR1cm4gKCkgPT4ge1xuICAgIGlmIChpc0NvbnN0YW50KSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQudGhlbihyZXNvbHZlZCA9PiB7XG4gICAgICBpZiAocmVxdWlyZXNSZWZyZXNoICYmICFyZXF1aXJlc1JlZnJlc2gocmVzb2x2ZWQpKSB7XG4gICAgICAgIGlzQ29uc3RhbnQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gcmVzb2x2ZWQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc0V4cGlyZWQocmVzb2x2ZWQpKSB7XG4gICAgICAgIHJldHVybiAocmVzdWx0ID0gcHJvdmlkZXIoKSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXNvbHZlZDtcbiAgICB9KTtcbiAgfTtcbn1cbiJdfQ==

/***/ }),

/***/ 9697:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var os_1 = __nccwpck_require__(2087);
var path_1 = __nccwpck_require__(5622);
var fs_1 = __nccwpck_require__(5747);
exports.ENV_CREDENTIALS_PATH = "AWS_SHARED_CREDENTIALS_FILE";
exports.ENV_CONFIG_PATH = "AWS_CONFIG_FILE";
var swallowError = function () { return ({}); };
function loadSharedConfigFiles(init) {
    if (init === void 0) { init = {}; }
    var _a = init.filepath, filepath = _a === void 0 ? process.env[exports.ENV_CREDENTIALS_PATH] ||
        path_1.join(getHomeDir(), ".aws", "credentials") : _a, _b = init.configFilepath, configFilepath = _b === void 0 ? process.env[exports.ENV_CONFIG_PATH] ||
        path_1.join(getHomeDir(), ".aws", "config") : _b;
    return Promise.all([
        slurpFile(configFilepath)
            .then(parseIni)
            .then(normalizeConfigFile)
            .catch(swallowError),
        slurpFile(filepath).then(parseIni).catch(swallowError)
    ]).then(function (parsedFiles) {
        var configFile = parsedFiles[0], credentialsFile = parsedFiles[1];
        return {
            configFile: configFile,
            credentialsFile: credentialsFile
        };
    });
}
exports.loadSharedConfigFiles = loadSharedConfigFiles;
var profileKeyRegex = /^profile\s(["'])?([^\1]+)\1$/;
function normalizeConfigFile(data) {
    var map = {};
    for (var _i = 0, _a = Object.keys(data); _i < _a.length; _i++) {
        var key = _a[_i];
        var matches = void 0;
        if (key === "default") {
            map.default = data.default;
        }
        else if ((matches = profileKeyRegex.exec(key))) {
            var _1 = matches[0], _2 = matches[1], normalizedKey = matches[2];
            if (normalizedKey) {
                map[normalizedKey] = data[key];
            }
        }
    }
    return map;
}
function parseIni(iniData) {
    var map = {};
    var currentSection;
    for (var _i = 0, _a = iniData.split(/\r?\n/); _i < _a.length; _i++) {
        var line = _a[_i];
        line = line.split(/(^|\s)[;#]/)[0]; // remove comments
        var section = line.match(/^\s*\[([^\[\]]+)]\s*$/);
        if (section) {
            currentSection = section[1];
        }
        else if (currentSection) {
            var item = line.match(/^\s*(.+?)\s*=\s*(.+?)\s*$/);
            if (item) {
                map[currentSection] = map[currentSection] || {};
                map[currentSection][item[1]] = item[2];
            }
        }
    }
    return map;
}
function slurpFile(path) {
    return new Promise(function (resolve, reject) {
        fs_1.readFile(path, "utf8", function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}
function getHomeDir() {
    var _a = process.env, HOME = _a.HOME, USERPROFILE = _a.USERPROFILE, HOMEPATH = _a.HOMEPATH, _b = _a.HOMEDRIVE, HOMEDRIVE = _b === void 0 ? "C:" + path_1.sep : _b;
    if (HOME)
        return HOME;
    if (USERPROFILE)
        return USERPROFILE;
    if (HOMEPATH)
        return "" + HOMEDRIVE + HOMEPATH;
    return os_1.homedir();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlCQUE2QjtBQUM3Qiw2QkFBaUM7QUFDakMseUJBQThCO0FBRWpCLFFBQUEsb0JBQW9CLEdBQUcsNkJBQTZCLENBQUM7QUFDckQsUUFBQSxlQUFlLEdBQUcsaUJBQWlCLENBQUM7QUErQmpELElBQU0sWUFBWSxHQUFHLGNBQU0sT0FBQSxDQUFDLEVBQUUsQ0FBQyxFQUFKLENBQUksQ0FBQztBQUVoQyxTQUFnQixxQkFBcUIsQ0FDbkMsSUFBMkI7SUFBM0IscUJBQUEsRUFBQSxTQUEyQjtJQUd6QixJQUFBLGtCQUMyQyxFQUQzQzs2REFDMkMsRUFDM0Msd0JBQ3NDLEVBRHRDO3dEQUNzQyxDQUMvQjtJQUVULE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNqQixTQUFTLENBQUMsY0FBYyxDQUFDO2FBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUM7YUFDZCxJQUFJLENBQUMsbUJBQW1CLENBQUM7YUFDekIsS0FBSyxDQUFDLFlBQVksQ0FBQztRQUN0QixTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUM7S0FDdkQsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLFdBQWlDO1FBQ2pDLElBQUEsMkJBQVUsRUFBRSxnQ0FBZSxDQUFnQjtRQUNsRCxPQUFPO1lBQ0wsVUFBVSxZQUFBO1lBQ1YsZUFBZSxpQkFBQTtTQUNoQixDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBdkJELHNEQXVCQztBQUVELElBQU0sZUFBZSxHQUFHLDhCQUE4QixDQUFDO0FBQ3ZELFNBQVMsbUJBQW1CLENBQUMsSUFBbUI7SUFDOUMsSUFBTSxHQUFHLEdBQWtCLEVBQUUsQ0FBQztJQUM5QixLQUFnQixVQUFpQixFQUFqQixLQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQWpCLGNBQWlCLEVBQWpCLElBQWlCLEVBQUU7UUFBOUIsSUFBSSxHQUFHLFNBQUE7UUFDVixJQUFJLE9BQU8sU0FBc0IsQ0FBQztRQUNsQyxJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUU7WUFDckIsR0FBRyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBQzVCO2FBQU0sSUFBSSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDekMsSUFBQSxlQUFFLEVBQUUsZUFBRSxFQUFFLDBCQUFhLENBQVk7WUFDeEMsSUFBSSxhQUFhLEVBQUU7Z0JBQ2pCLEdBQUcsQ0FBQyxhQUFhLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDaEM7U0FDRjtLQUNGO0lBRUQsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBRUQsU0FBUyxRQUFRLENBQUMsT0FBZTtJQUMvQixJQUFNLEdBQUcsR0FBa0IsRUFBRSxDQUFDO0lBQzlCLElBQUksY0FBa0MsQ0FBQztJQUN2QyxLQUFpQixVQUFzQixFQUF0QixLQUFBLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQXRCLGNBQXNCLEVBQXRCLElBQXNCLEVBQUU7UUFBcEMsSUFBSSxJQUFJLFNBQUE7UUFDWCxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGtCQUFrQjtRQUN0RCxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDcEQsSUFBSSxPQUFPLEVBQUU7WUFDWCxjQUFjLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzdCO2FBQU0sSUFBSSxjQUFjLEVBQUU7WUFDekIsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1lBQ3JELElBQUksSUFBSSxFQUFFO2dCQUNSLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNoRCxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3hDO1NBQ0Y7S0FDRjtJQUVELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQUVELFNBQVMsU0FBUyxDQUFDLElBQVk7SUFDN0IsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1FBQ2pDLGFBQVEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQUMsR0FBRyxFQUFFLElBQUk7WUFDL0IsSUFBSSxHQUFHLEVBQUU7Z0JBQ1AsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ2I7aUJBQU07Z0JBQ0wsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2Y7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELFNBQVMsVUFBVTtJQUNYLElBQUEsZ0JBQXFFLEVBQW5FLGNBQUksRUFBRSw0QkFBVyxFQUFFLHNCQUFRLEVBQUUsaUJBQXNCLEVBQXRCLGtEQUFzQyxDQUFDO0lBRTVFLElBQUksSUFBSTtRQUFFLE9BQU8sSUFBSSxDQUFDO0lBQ3RCLElBQUksV0FBVztRQUFFLE9BQU8sV0FBVyxDQUFDO0lBQ3BDLElBQUksUUFBUTtRQUFFLE9BQU8sS0FBRyxTQUFTLEdBQUcsUUFBVSxDQUFDO0lBRS9DLE9BQU8sWUFBTyxFQUFFLENBQUM7QUFDbkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGhvbWVkaXIgfSBmcm9tIFwib3NcIjtcbmltcG9ydCB7IGpvaW4sIHNlcCB9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyByZWFkRmlsZSB9IGZyb20gXCJmc1wiO1xuXG5leHBvcnQgY29uc3QgRU5WX0NSRURFTlRJQUxTX1BBVEggPSBcIkFXU19TSEFSRURfQ1JFREVOVElBTFNfRklMRVwiO1xuZXhwb3J0IGNvbnN0IEVOVl9DT05GSUdfUEFUSCA9IFwiQVdTX0NPTkZJR19GSUxFXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2hhcmVkQ29uZmlnSW5pdCB7XG4gIC8qKlxuICAgKiBUaGUgcGF0aCBhdCB3aGljaCB0byBsb2NhdGUgdGhlIGluaSBjcmVkZW50aWFscyBmaWxlLiBEZWZhdWx0cyB0byB0aGVcbiAgICogdmFsdWUgb2YgdGhlIGBBV1NfU0hBUkVEX0NSRURFTlRJQUxTX0ZJTEVgIGVudmlyb25tZW50IHZhcmlhYmxlIChpZlxuICAgKiBkZWZpbmVkKSBvciBgfi8uYXdzL2NyZWRlbnRpYWxzYCBvdGhlcndpc2UuXG4gICAqL1xuICBmaWxlcGF0aD86IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIHBhdGggYXQgd2hpY2ggdG8gbG9jYXRlIHRoZSBpbmkgY29uZmlnIGZpbGUuIERlZmF1bHRzIHRvIHRoZSB2YWx1ZSBvZlxuICAgKiB0aGUgYEFXU19DT05GSUdfRklMRWAgZW52aXJvbm1lbnQgdmFyaWFibGUgKGlmIGRlZmluZWQpIG9yXG4gICAqIGB+Ly5hd3MvY29uZmlnYCBvdGhlcndpc2UuXG4gICAqL1xuICBjb25maWdGaWxlcGF0aD86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9maWxlIHtcbiAgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBhcnNlZEluaURhdGEge1xuICBba2V5OiBzdHJpbmddOiBQcm9maWxlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNoYXJlZENvbmZpZ0ZpbGVzIHtcbiAgY3JlZGVudGlhbHNGaWxlOiBQYXJzZWRJbmlEYXRhO1xuICBjb25maWdGaWxlOiBQYXJzZWRJbmlEYXRhO1xufVxuXG5jb25zdCBzd2FsbG93RXJyb3IgPSAoKSA9PiAoe30pO1xuXG5leHBvcnQgZnVuY3Rpb24gbG9hZFNoYXJlZENvbmZpZ0ZpbGVzKFxuICBpbml0OiBTaGFyZWRDb25maWdJbml0ID0ge31cbik6IFByb21pc2U8U2hhcmVkQ29uZmlnRmlsZXM+IHtcbiAgY29uc3Qge1xuICAgIGZpbGVwYXRoID0gcHJvY2Vzcy5lbnZbRU5WX0NSRURFTlRJQUxTX1BBVEhdIHx8XG4gICAgICBqb2luKGdldEhvbWVEaXIoKSwgXCIuYXdzXCIsIFwiY3JlZGVudGlhbHNcIiksXG4gICAgY29uZmlnRmlsZXBhdGggPSBwcm9jZXNzLmVudltFTlZfQ09ORklHX1BBVEhdIHx8XG4gICAgICBqb2luKGdldEhvbWVEaXIoKSwgXCIuYXdzXCIsIFwiY29uZmlnXCIpXG4gIH0gPSBpbml0O1xuXG4gIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgc2x1cnBGaWxlKGNvbmZpZ0ZpbGVwYXRoKVxuICAgICAgLnRoZW4ocGFyc2VJbmkpXG4gICAgICAudGhlbihub3JtYWxpemVDb25maWdGaWxlKVxuICAgICAgLmNhdGNoKHN3YWxsb3dFcnJvciksXG4gICAgc2x1cnBGaWxlKGZpbGVwYXRoKS50aGVuKHBhcnNlSW5pKS5jYXRjaChzd2FsbG93RXJyb3IpXG4gIF0pLnRoZW4oKHBhcnNlZEZpbGVzOiBBcnJheTxQYXJzZWRJbmlEYXRhPikgPT4ge1xuICAgIGNvbnN0IFtjb25maWdGaWxlLCBjcmVkZW50aWFsc0ZpbGVdID0gcGFyc2VkRmlsZXM7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbmZpZ0ZpbGUsXG4gICAgICBjcmVkZW50aWFsc0ZpbGVcbiAgICB9O1xuICB9KTtcbn1cblxuY29uc3QgcHJvZmlsZUtleVJlZ2V4ID0gL15wcm9maWxlXFxzKFtcIiddKT8oW15cXDFdKylcXDEkLztcbmZ1bmN0aW9uIG5vcm1hbGl6ZUNvbmZpZ0ZpbGUoZGF0YTogUGFyc2VkSW5pRGF0YSk6IFBhcnNlZEluaURhdGEge1xuICBjb25zdCBtYXA6IFBhcnNlZEluaURhdGEgPSB7fTtcbiAgZm9yIChsZXQga2V5IG9mIE9iamVjdC5rZXlzKGRhdGEpKSB7XG4gICAgbGV0IG1hdGNoZXM6IEFycmF5PHN0cmluZz4gfCBudWxsO1xuICAgIGlmIChrZXkgPT09IFwiZGVmYXVsdFwiKSB7XG4gICAgICBtYXAuZGVmYXVsdCA9IGRhdGEuZGVmYXVsdDtcbiAgICB9IGVsc2UgaWYgKChtYXRjaGVzID0gcHJvZmlsZUtleVJlZ2V4LmV4ZWMoa2V5KSkpIHtcbiAgICAgIGNvbnN0IFtfMSwgXzIsIG5vcm1hbGl6ZWRLZXldID0gbWF0Y2hlcztcbiAgICAgIGlmIChub3JtYWxpemVkS2V5KSB7XG4gICAgICAgIG1hcFtub3JtYWxpemVkS2V5XSA9IGRhdGFba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbWFwO1xufVxuXG5mdW5jdGlvbiBwYXJzZUluaShpbmlEYXRhOiBzdHJpbmcpOiBQYXJzZWRJbmlEYXRhIHtcbiAgY29uc3QgbWFwOiBQYXJzZWRJbmlEYXRhID0ge307XG4gIGxldCBjdXJyZW50U2VjdGlvbjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBmb3IgKGxldCBsaW5lIG9mIGluaURhdGEuc3BsaXQoL1xccj9cXG4vKSkge1xuICAgIGxpbmUgPSBsaW5lLnNwbGl0KC8oXnxcXHMpWzsjXS8pWzBdOyAvLyByZW1vdmUgY29tbWVudHNcbiAgICBjb25zdCBzZWN0aW9uID0gbGluZS5tYXRjaCgvXlxccypcXFsoW15cXFtcXF1dKyldXFxzKiQvKTtcbiAgICBpZiAoc2VjdGlvbikge1xuICAgICAgY3VycmVudFNlY3Rpb24gPSBzZWN0aW9uWzFdO1xuICAgIH0gZWxzZSBpZiAoY3VycmVudFNlY3Rpb24pIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBsaW5lLm1hdGNoKC9eXFxzKiguKz8pXFxzKj1cXHMqKC4rPylcXHMqJC8pO1xuICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgbWFwW2N1cnJlbnRTZWN0aW9uXSA9IG1hcFtjdXJyZW50U2VjdGlvbl0gfHwge307XG4gICAgICAgIG1hcFtjdXJyZW50U2VjdGlvbl1baXRlbVsxXV0gPSBpdGVtWzJdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBtYXA7XG59XG5cbmZ1bmN0aW9uIHNsdXJwRmlsZShwYXRoOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHJlYWRGaWxlKHBhdGgsIFwidXRmOFwiLCAoZXJyLCBkYXRhKSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZShkYXRhKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldEhvbWVEaXIoKTogc3RyaW5nIHtcbiAgY29uc3QgeyBIT01FLCBVU0VSUFJPRklMRSwgSE9NRVBBVEgsIEhPTUVEUklWRSA9IGBDOiR7c2VwfWAgfSA9IHByb2Nlc3MuZW52O1xuXG4gIGlmIChIT01FKSByZXR1cm4gSE9NRTtcbiAgaWYgKFVTRVJQUk9GSUxFKSByZXR1cm4gVVNFUlBST0ZJTEU7XG4gIGlmIChIT01FUEFUSCkgcmV0dXJuIGAke0hPTUVEUklWRX0ke0hPTUVQQVRIfWA7XG5cbiAgcmV0dXJuIGhvbWVkaXIoKTtcbn1cbiJdfQ==

/***/ }),

/***/ 4812:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports =
{
  parallel      : __nccwpck_require__(8210),
  serial        : __nccwpck_require__(445),
  serialOrdered : __nccwpck_require__(3578)
};


/***/ }),

/***/ 1700:
/***/ ((module) => {

// API
module.exports = abort;

/**
 * Aborts leftover active jobs
 *
 * @param {object} state - current state object
 */
function abort(state)
{
  Object.keys(state.jobs).forEach(clean.bind(state));

  // reset leftover jobs
  state.jobs = {};
}

/**
 * Cleans up leftover job by invoking abort function for the provided job id
 *
 * @this  state
 * @param {string|number} key - job id to abort
 */
function clean(key)
{
  if (typeof this.jobs[key] == 'function')
  {
    this.jobs[key]();
  }
}


/***/ }),

/***/ 2794:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var defer = __nccwpck_require__(5295);

// API
module.exports = async;

/**
 * Runs provided callback asynchronously
 * even if callback itself is not
 *
 * @param   {function} callback - callback to invoke
 * @returns {function} - augmented callback
 */
function async(callback)
{
  var isAsync = false;

  // check if async happened
  defer(function() { isAsync = true; });

  return function async_callback(err, result)
  {
    if (isAsync)
    {
      callback(err, result);
    }
    else
    {
      defer(function nextTick_callback()
      {
        callback(err, result);
      });
    }
  };
}


/***/ }),

/***/ 5295:
/***/ ((module) => {

module.exports = defer;

/**
 * Runs provided function on next iteration of the event loop
 *
 * @param {function} fn - function to run
 */
function defer(fn)
{
  var nextTick = typeof setImmediate == 'function'
    ? setImmediate
    : (
      typeof process == 'object' && typeof process.nextTick == 'function'
      ? process.nextTick
      : null
    );

  if (nextTick)
  {
    nextTick(fn);
  }
  else
  {
    setTimeout(fn, 0);
  }
}


/***/ }),

/***/ 9023:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var async = __nccwpck_require__(2794)
  , abort = __nccwpck_require__(1700)
  ;

// API
module.exports = iterate;

/**
 * Iterates over each job object
 *
 * @param {array|object} list - array or object (named list) to iterate over
 * @param {function} iterator - iterator to run
 * @param {object} state - current job status
 * @param {function} callback - invoked when all elements processed
 */
function iterate(list, iterator, state, callback)
{
  // store current index
  var key = state['keyedList'] ? state['keyedList'][state.index] : state.index;

  state.jobs[key] = runJob(iterator, key, list[key], function(error, output)
  {
    // don't repeat yourself
    // skip secondary callbacks
    if (!(key in state.jobs))
    {
      return;
    }

    // clean up jobs
    delete state.jobs[key];

    if (error)
    {
      // don't process rest of the results
      // stop still active jobs
      // and reset the list
      abort(state);
    }
    else
    {
      state.results[key] = output;
    }

    // return salvaged results
    callback(error, state.results);
  });
}

/**
 * Runs iterator over provided job element
 *
 * @param   {function} iterator - iterator to invoke
 * @param   {string|number} key - key/index of the element in the list of jobs
 * @param   {mixed} item - job description
 * @param   {function} callback - invoked after iterator is done with the job
 * @returns {function|mixed} - job abort function or something else
 */
function runJob(iterator, key, item, callback)
{
  var aborter;

  // allow shortcut if iterator expects only two arguments
  if (iterator.length == 2)
  {
    aborter = iterator(item, async(callback));
  }
  // otherwise go with full three arguments
  else
  {
    aborter = iterator(item, key, async(callback));
  }

  return aborter;
}


/***/ }),

/***/ 2474:
/***/ ((module) => {

// API
module.exports = state;

/**
 * Creates initial state object
 * for iteration over list
 *
 * @param   {array|object} list - list to iterate over
 * @param   {function|null} sortMethod - function to use for keys sort,
 *                                     or `null` to keep them as is
 * @returns {object} - initial state object
 */
function state(list, sortMethod)
{
  var isNamedList = !Array.isArray(list)
    , initState =
    {
      index    : 0,
      keyedList: isNamedList || sortMethod ? Object.keys(list) : null,
      jobs     : {},
      results  : isNamedList ? {} : [],
      size     : isNamedList ? Object.keys(list).length : list.length
    }
    ;

  if (sortMethod)
  {
    // sort array keys based on it's values
    // sort object's keys just on own merit
    initState.keyedList.sort(isNamedList ? sortMethod : function(a, b)
    {
      return sortMethod(list[a], list[b]);
    });
  }

  return initState;
}


/***/ }),

/***/ 7942:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var abort = __nccwpck_require__(1700)
  , async = __nccwpck_require__(2794)
  ;

// API
module.exports = terminator;

/**
 * Terminates jobs in the attached state context
 *
 * @this  AsyncKitState#
 * @param {function} callback - final callback to invoke after termination
 */
function terminator(callback)
{
  if (!Object.keys(this.jobs).length)
  {
    return;
  }

  // fast forward iteration index
  this.index = this.size;

  // abort jobs
  abort(this);

  // send back results we have so far
  async(callback)(null, this.results);
}


/***/ }),

/***/ 8210:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var iterate    = __nccwpck_require__(9023)
  , initState  = __nccwpck_require__(2474)
  , terminator = __nccwpck_require__(7942)
  ;

// Public API
module.exports = parallel;

/**
 * Runs iterator over provided array elements in parallel
 *
 * @param   {array|object} list - array or object (named list) to iterate over
 * @param   {function} iterator - iterator to run
 * @param   {function} callback - invoked when all elements processed
 * @returns {function} - jobs terminator
 */
function parallel(list, iterator, callback)
{
  var state = initState(list);

  while (state.index < (state['keyedList'] || list).length)
  {
    iterate(list, iterator, state, function(error, result)
    {
      if (error)
      {
        callback(error, result);
        return;
      }

      // looks like it's the last one
      if (Object.keys(state.jobs).length === 0)
      {
        callback(null, state.results);
        return;
      }
    });

    state.index++;
  }

  return terminator.bind(state, callback);
}


/***/ }),

/***/ 445:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var serialOrdered = __nccwpck_require__(3578);

// Public API
module.exports = serial;

/**
 * Runs iterator over provided array elements in series
 *
 * @param   {array|object} list - array or object (named list) to iterate over
 * @param   {function} iterator - iterator to run
 * @param   {function} callback - invoked when all elements processed
 * @returns {function} - jobs terminator
 */
function serial(list, iterator, callback)
{
  return serialOrdered(list, iterator, null, callback);
}


/***/ }),

/***/ 3578:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var iterate    = __nccwpck_require__(9023)
  , initState  = __nccwpck_require__(2474)
  , terminator = __nccwpck_require__(7942)
  ;

// Public API
module.exports = serialOrdered;
// sorting helpers
module.exports.ascending  = ascending;
module.exports.descending = descending;

/**
 * Runs iterator over provided sorted array elements in series
 *
 * @param   {array|object} list - array or object (named list) to iterate over
 * @param   {function} iterator - iterator to run
 * @param   {function} sortMethod - custom sort function
 * @param   {function} callback - invoked when all elements processed
 * @returns {function} - jobs terminator
 */
function serialOrdered(list, iterator, sortMethod, callback)
{
  var state = initState(list, sortMethod);

  iterate(list, iterator, state, function iteratorHandler(error, result)
  {
    if (error)
    {
      callback(error, result);
      return;
    }

    state.index++;

    // are we there yet?
    if (state.index < (state['keyedList'] || list).length)
    {
      iterate(list, iterator, state, iteratorHandler);
      return;
    }

    // done here
    callback(null, state.results);
  });

  return terminator.bind(state, callback);
}

/*
 * -- Sort methods
 */

/**
 * sort helper to sort array elements in ascending order
 *
 * @param   {mixed} a - an item to compare
 * @param   {mixed} b - an item to compare
 * @returns {number} - comparison result
 */
function ascending(a, b)
{
  return a < b ? -1 : a > b ? 1 : 0;
}

/**
 * sort helper to sort array elements in descending order
 *
 * @param   {mixed} a - an item to compare
 * @param   {mixed} b - an item to compare
 * @returns {number} - comparison result
 */
function descending(a, b)
{
  return -1 * ascending(a, b);
}


/***/ }),

/***/ 2073:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

const request = __nccwpck_require__(3817)
const backoff = __nccwpck_require__(3183)
const urlJoin = __nccwpck_require__(2821)
const FormData = __nccwpck_require__(3735)
const packageData = __nccwpck_require__(2626)
const { getAuthenticationHeaders } = __nccwpck_require__(7732)
const { log, noop } = __nccwpck_require__(7996)

const globalHeaders = {
  'X-Cerberus-Client': `CerberusNodeClient/${packageData.version}`
}

const cerberusVersion = 'v1'
const DEFAULT_RETRY_ATTEMPT_NUMBER = 3

/**
 * Options for creating a {@link CerberusClient}
 * @interface CerberusClientOptions
 * @typedef CerberusClientOptions
 * @type {object}
 * @property {string} hostUrl required base url for the Cerberus API.
 * @property {string} [region] region to sign sts auth request for, defaults to us-west-2
 * @property {string} [token] Override the cerberus token. Useful for testing
 * @property {boolean} [debug] If set to true additional logging occurs.
 */

/**
 * @interface ListKeyResult
 * @typedef ListKeyResult
 * @type {object}
 * @property {array<string>} keys
 */

/**
 * @interface ListFileResult
 * @typedef ListFileResult
 * @type {object}
 * @property {boolean} has_next If the result requires pagination
 * @property {string} next_offset The offset to use for the next page
 * @property {number} limit The limit that was used for the results
 * @property {number} offset The offset of the results
 * @property {number} file_count_in_result Number of files in result
 * @property {number} total_file_count Number of total files under path
 * @property {array<SecureFileSummary>} secure_file_summaries
 */

/**
 * @interface SecureFileSummary
 * @typedef SecureFileSummary
 * @type {object}
 * @property {string} sdbox_id The SDB id
 * @property {string} path The path for the file
 * @property {number} size_in_bytes The size in bytes of the file
 * @property {string} name The name of the file
 * @property {string} created_by Who originally uploaded the file
 * @property {string} created_ts ISO 8061 String of when the file was originally uploaded
 * @property {string} last_updated_by Who last updated the file
 * @property {string} last_updated_ts ISO 8061 String of when the file was last updated
 */

/**
 * Cerberus client with CRUD operations for secure data and files.
 *
 * @example
 * var CerberusClient = require('cerberus-node-client')
 *
 * var client = new CerberusClient({
 *   // string, The cerberus URL to use.
 *   hostUrl: YOUR_CERBERUS_HOST,
 *
 *   // string, AWS region, required if authenticating to AWS China, otherwise defaults to us-west-2
 *   region: AWS_REGION,
 *
 *   // boolean, defaults to false. When true will console.log many operations
 *   debug: true,
 *
 *   // This will be used as the cerberus X-Vault-Token if supplied
 *   // OVERRIDDEN by process.env.CERBERUS_TOKEN
 *   // If present, normal authentication with cerberus will be skipped
 *   // You should normally only be using this in testing environments
 *   // When developing locally, it is easier to use process.env.CERBERUS_TOKEN
 *   token: 'Some_Auth_Token'
 * })
 *
 * client.getSecureData('path/to/my/secret').then(secureConfig => {
 *   //do something with config
 * })
 */
class CerberusClient {
  /**
   * @param {CerberusClientOptions} options The options for the Cerberus client.
   */
  constructor (options) {
    if (!options || typeof options !== 'object') {
      throw new Error('options parameter is required')
    }
    this._log = options.debug ? log : noop

    if (options.token) {
      this._log('constructor options token found', options.token)
      this._token = options.token
    } else {
      // Override context with env variables
      const envToken = getEnvironmentVariable(process.env.CERBERUS_TOKEN)
      if (envToken) {
        this._log('environment variable token found', envToken)
        this._token = envToken
      }
    }

    // Validate configuration
    if (typeof options.hostUrl !== 'string') {
      throw new Error('options.hostUrl must be a URL string')
    }

    this._hostUrl = options.hostUrl
    this._region = options.region ? options.region : 'us-west-2'
  }

  /**
   * Fetches secure data.
   *
   * @param {string} path The path for the secure data
   * @return {Promise<object>} A promise that when resolved supplies the secure data
   */
  getSecureData (path) {
    return this._doSecretAction('GET', path, undefined)
  }

  /**
   * Writes secure data.
   *
   * @param {string} path The path for the secure data
   * @param {object} data The secure data
   * @return {Promise<undefined>} A promise that will be resolved when the write is finished
   */
  writeSecureData (path, data) {
    return this._doSecretAction('POST', path, data)
  }

  /**
   * Deletes secure data.
   *
   * @param {string} path The path for the secure data
   * @return {Promise<object>} A promise that will be resolved when the delete is finished
   */
  deleteSecureData (path) {
    return this._doSecretAction('DELETE', path, undefined)
  }

  /**
   * lists the keys under a secure data path.
   *
   * If no keys are present {ListKeyResult} will have an empty array.
   *
   * @param {string} path The path or partial path
   * @return {Promise<ListKeyResult>} A promise that will be resolved when the list is finished supplying the results
   */
  async listPathsForSecureData (path) {
    let res
    try {
      res = await this._doSecretAction('LIST', path, undefined)
    } catch (e) {
      // If no keys under a partial path can be found the API returns a 404, lets convert that to set of empty keys
      if (e.message.includes('status code: 404')) {
        res = { keys: [] }
      } else {
        const msg = 'There was an issue trying to list paths for secure data\nmsg: ' + e.message
        this._log(msg)
        throw new Error(msg)
      }
    }
    return res
  }

  /**
   * lists the files under a path.
   *
   * @param {string} path The path or partial path
   * @return {Promise<ListFileResult>} A promise that will be resolved when the list is finished supplying the {ListFileResult}
   */
  listFile (path) {
    return this._doFileAction('LIST', path, undefined)
  }

  /**
   * Reads the contents of an uploaded file
   *
   * @param {string} path The path the the uploaded file
   * @return {Promise<Buffer|string>} A promise that will be resolved when the file contents have been fetched
   */
  readFile (path) {
    return this._doFileAction('GET', path, undefined)
  }

  /**
   * Uploads a file to a given path
   *
   * @param {string} path The path
   * @param {string|Buffer} data The file buffer or string
   * @return {Promise<object>} A promise that will be resolved when the file contents have been uploaded
   */
  writeFile (path, data) {
    return this._doFileAction('POST', path, data)
  }

  /**
   * deletes an uploaded file
   *
   * @param {string} path The path the the uploaded file
   * @return {Promise<object>} A promise that will be resolved when the file contents have been deleted
   */
  deleteFile (path) {
    return this._doFileAction('DELETE', path, undefined)
  }

  /**
   * Performs an API action against the secret endpoint in Cerberus
   *
   * @param type The type of secret action
   * @param {string} path The secure data path
   * @param body The post for writes
   * @return {Promise<*>} This method returns a promised that when resolved will supply the secure data.
   * @private
   */
  async _doSecretAction (type, path, body) {
    this._log(`Starting ${type} request for ${path}`)
    const token = await this._getToken()
    const response = await this._executeCerberusRequest({
      headers: Object.assign({}, globalHeaders, { 'X-Cerberus-Token': token }),
      method: type === 'LIST' ? 'GET' : type,
      url: urlJoin(this._hostUrl, cerberusVersion, 'secret', path) + (type === 'LIST' ? '?list=true' : ''),
      body: body
    })

    return response ? response.data : undefined
  }

  /**
   * Executes a request against the Cerberus API dealing with any error cases.
   *
   * @param requestConfig The request configuration to be executed
   * @return {Promise<*>} The response body from Cerberus
   * @private
   */
  async _executeCerberusRequest (requestConfig) {
    let response
    try {
      response = await this._executeRequest(Object.assign({}, { json: true }, requestConfig))
    } catch (error) {
      const msg = 'There was an error executing a call to Cerberus.\nmsg: \'' + error.message + '\''
      this._log(msg)
      throw new Error(msg)
    }

    if (!(response.statusCode >= 200 && response.statusCode < 300)) {
      if (response.headers['content-type'] && response.headers['content-type'].startsWith('application/json')) {
        const msg = `Cerberus returned an error, when executing a call.\nstatus code: ${response.statusCode}\nmsg: ${JSON.stringify(response.data)}`
        this._log(msg)
        throw new Error(msg)
      } else {
        const msg = `Cerberus returned a non-success response that wasn't JSON, this is likely due to being blocked by the WAF.\nstatus code: ${response.statusCode}\nmsg: ${response.data ? response.data : ''}`
        this._log(msg)
        throw new Error(msg)
      }
    }

    return response.data
  }

  // noinspection JSMethodCanBeStatic
  /**
   * Uses the micro request library to execute the request
   * @param requestConfig
   * @return {promise<*>}
   * @private
   */
  async _executeRequest (requestConfig) {
    let resp
    try {
      return await backoff.backOff(async () => {
        resp = await request(requestConfig)
        if (!resp) {
          return resp
        } else if (resp.statusCode < 500) {
          return resp
        } else {
          throw new Error('Cerberus returned a Server Error, executing retry')
        }
      }, { numOfAttempts: DEFAULT_RETRY_ATTEMPT_NUMBER })
    } catch (e) {
      return resp
    }
  }

  /**
   * Uses setTimeout to make a sleep function
   *
   * @param {int} type - the number of milliseconds to sleep for
   * @returns {promise<*>}
   * @private
   */
  _sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  /**
   * Upload, delete, read, and list files on Cerberus.
   *
   * @param {string} type - The HTTP method (with the exception of 'LIST') to use as outlined in https://github.com/Nike-Inc/cerberus-management-service/blob/master/API.md
   * @param {string} filePath - The path of the file
   * @param {string|Buffer} fileBuffer - Buffer of the file to upload
   * @returns {Promise<object>} Buffer if read file and Cerberus response otherwise
   * @private
   */
  async _doFileAction (type, filePath, fileBuffer) {
    this._log(`Starting ${type} file request for ${filePath}`)
    const token = await this._getToken()
    let form
    if (fileBuffer) {
      form = new FormData({})
      form.append('file-content', fileBuffer, { filename: filePath.match(/([^/]*)\/*$/)[1] })
    }

    const data = await this._executeCerberusRequest({
      method: type === 'LIST' ? 'GET' : type,
      url: urlJoin(this._hostUrl, cerberusVersion, type === 'LIST' ? 'secure-files' : 'secure-file', filePath),
      headers: Object.assign({}, globalHeaders, { 'X-Cerberus-Token': token }, type === 'POST' ? form.getHeaders() : undefined),
      body: form,
      json: type === 'LIST' || type === 'DELETE'
    })

    return data
  }

  /**
   * Fetches a token either from a local env var or attempts to authenticate with Cerberus via the STS authentication endpoint.
   *
   * @return {Promise<string>} when the promise is resolved the Cerberus auth token string is supplied.
   * @private
   */
  async _getToken () {
    // tokenExpiresAt in secs, Date.now in ms
    if (this._tokenExpiresAt && (this._tokenExpiresAt <= (Date.now() / 1000))) {
      this._tokenExpiresAt = null
      this._token = null
    }

    // Already has token
    if (this._token) {
      this._log('returning stored token')
      return this._token
    }

    let authResponse
    try {
      const authHeaders = await getAuthenticationHeaders(this._region)
      authResponse = await this._executeCerberusRequest({
        method: 'POST',
        url: urlJoin(this._hostUrl, 'v2/auth/sts-identity'),
        headers: Object.assign({}, globalHeaders, authHeaders)
      })
    } catch (error) {
      const msg = 'There was an issue trying to authenticate with Cerberus using the STS auth endpoint\nmsg: \'' + error.message + '\''
      this._log(msg)
      throw new Error(msg)
    }

    if (authResponse.metadata.aws_iam_principal_arn != null) {
      this._log('Successfully authenticated with Cerberus as ' + authResponse.metadata.aws_iam_principal_arn)
    } else if (authResponse.metadata.username != null) {
      this._log('Successfully authenticated with Cerberus as ' + authResponse.metadata.username)
    }
    // Expire 60 seconds before lease is up, to account for latency
    this._tokenExpiresAt = (Date.now() / 1000) + authResponse.lease_duration - 60 // token TTL in secs, Date.now in ms
    this._token = authResponse.client_token
    return this._token
  }
}

/**
 * Gets the set value or undefined
 *
 * @param value The value under question
 * @return {String|undefined} Returns the string of the value or undefined
 * @private
 */
const getEnvironmentVariable = (value) => {
  return value && value !== 'undefined' && value !== undefined && value !== null ? value : undefined
}

module.exports = CerberusClient


/***/ }),

/***/ 7996:
/***/ ((module) => {

const log = (...args) => {
  console.log('cerberus-node', ...args)
}

const noop = () => { }

module.exports = {
  log,
  noop
}


/***/ }),

/***/ 7732:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { defaultProvider: fetchAwsCredentials } = __nccwpck_require__(4091)
const crypto = __nccwpck_require__(6417)

const CHINA_REGIONS = ['cn-north-1', 'cn-northwest-1']

function hmac (key, string, encoding) {
  return crypto
    .createHmac('sha256', key)
    .update(string, 'utf8')
    .digest(encoding)
}

function hash (string, encoding) {
  return crypto
    .createHash('sha256')
    .update(string, 'utf8')
    .digest(encoding)
}

const getAuthenticationHeaders = async (region) => {
  // Fetch credentials from the AWS Default credentials provider chain
  let awsCredentials
  try {
    awsCredentials = await fetchAwsCredentials()()
  } catch (e) {
    throw new Error('Failed to get AWS credentials, do you have IAM credentials available?\n' +
      'See: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html\nmsg: \'' + e.message + '\'')
  }
  const { accessKeyId, secretAccessKey, sessionToken } = awsCredentials

  const signedHeaders = 'host;x-amz-date'
  const date = new Date()
  const dateISO = date.toISOString().replace(/[:-]|\.\d{3}/g, '')
  const dateScope = dateISO.slice(0, 8)
  const dateUTC = date.toUTCString()
  let url = `host:sts.${region}.amazonaws.com`

  if (CHINA_REGIONS.includes(region)) {
    url = url.concat('.cn')
  }

  const canonicalRequest = [
    'POST',
    '/',
    '',
    url,
    `x-amz-date:${dateISO}`,
    '',
    signedHeaders,
    hash('Action=GetCallerIdentity&Version=2011-06-15', 'hex')
  ].join('\n')

  const canonicalRequestHash = hash(canonicalRequest, 'hex')
  const stringToSign = [
    'AWS4-HMAC-SHA256',
    dateISO,
    `${dateScope}/${region}/sts/aws4_request`,
    canonicalRequestHash
  ].join('\n')

  const kDate = hmac(`AWS4${secretAccessKey}`, dateScope)
  const kRegion = hmac(kDate, region)
  const kService = hmac(kRegion, 'sts')
  const kCredentials = hmac(kService, 'aws4_request')

  const signature = hmac(kCredentials, stringToSign, 'hex')

  let headers = {
    Accept: 'application/json',
    Authorization: `AWS4-HMAC-SHA256 Credential=${accessKeyId}/${dateScope}/${region}/sts/aws4_request, SignedHeaders=${signedHeaders}, Signature=${signature}`,
    Date: dateUTC,
    'x-amz-date': dateISO
  }

  if (sessionToken) {
    headers = Object.assign({}, headers, {
      'x-amz-security-token': sessionToken
    })
  }

  return headers
}

module.exports = {
  getAuthenticationHeaders: getAuthenticationHeaders
}


/***/ }),

/***/ 3735:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var CombinedStream = __nccwpck_require__(5443);
var util = __nccwpck_require__(1669);
var path = __nccwpck_require__(5622);
var http = __nccwpck_require__(8605);
var https = __nccwpck_require__(7211);
var parseUrl = __nccwpck_require__(8835).parse;
var fs = __nccwpck_require__(5747);
var mime = __nccwpck_require__(3583);
var asynckit = __nccwpck_require__(4812);
var populate = __nccwpck_require__(5751);

// Public API
module.exports = FormData;

// make it a Stream
util.inherits(FormData, CombinedStream);

/**
 * Create readable "multipart/form-data" streams.
 * Can be used to submit forms
 * and file uploads to other web applications.
 *
 * @constructor
 * @param {Object} options - Properties to be added/overriden for FormData and CombinedStream
 */
function FormData(options) {
  if (!(this instanceof FormData)) {
    return new FormData(options);
  }

  this._overheadLength = 0;
  this._valueLength = 0;
  this._valuesToMeasure = [];

  CombinedStream.call(this);

  options = options || {};
  for (var option in options) {
    this[option] = options[option];
  }
}

FormData.LINE_BREAK = '\r\n';
FormData.DEFAULT_CONTENT_TYPE = 'application/octet-stream';

FormData.prototype.append = function(field, value, options) {

  options = options || {};

  // allow filename as single option
  if (typeof options == 'string') {
    options = {filename: options};
  }

  var append = CombinedStream.prototype.append.bind(this);

  // all that streamy business can't handle numbers
  if (typeof value == 'number') {
    value = '' + value;
  }

  // https://github.com/felixge/node-form-data/issues/38
  if (util.isArray(value)) {
    // Please convert your array into string
    // the way web server expects it
    this._error(new Error('Arrays are not supported.'));
    return;
  }

  var header = this._multiPartHeader(field, value, options);
  var footer = this._multiPartFooter();

  append(header);
  append(value);
  append(footer);

  // pass along options.knownLength
  this._trackLength(header, value, options);
};

FormData.prototype._trackLength = function(header, value, options) {
  var valueLength = 0;

  // used w/ getLengthSync(), when length is known.
  // e.g. for streaming directly from a remote server,
  // w/ a known file a size, and not wanting to wait for
  // incoming file to finish to get its size.
  if (options.knownLength != null) {
    valueLength += +options.knownLength;
  } else if (Buffer.isBuffer(value)) {
    valueLength = value.length;
  } else if (typeof value === 'string') {
    valueLength = Buffer.byteLength(value);
  }

  this._valueLength += valueLength;

  // @check why add CRLF? does this account for custom/multiple CRLFs?
  this._overheadLength +=
    Buffer.byteLength(header) +
    FormData.LINE_BREAK.length;

  // empty or either doesn't have path or not an http response
  if (!value || ( !value.path && !(value.readable && value.hasOwnProperty('httpVersion')) )) {
    return;
  }

  // no need to bother with the length
  if (!options.knownLength) {
    this._valuesToMeasure.push(value);
  }
};

FormData.prototype._lengthRetriever = function(value, callback) {

  if (value.hasOwnProperty('fd')) {

    // take read range into a account
    // `end` = Infinity –> read file till the end
    //
    // TODO: Looks like there is bug in Node fs.createReadStream
    // it doesn't respect `end` options without `start` options
    // Fix it when node fixes it.
    // https://github.com/joyent/node/issues/7819
    if (value.end != undefined && value.end != Infinity && value.start != undefined) {

      // when end specified
      // no need to calculate range
      // inclusive, starts with 0
      callback(null, value.end + 1 - (value.start ? value.start : 0));

    // not that fast snoopy
    } else {
      // still need to fetch file size from fs
      fs.stat(value.path, function(err, stat) {

        var fileSize;

        if (err) {
          callback(err);
          return;
        }

        // update final size based on the range options
        fileSize = stat.size - (value.start ? value.start : 0);
        callback(null, fileSize);
      });
    }

  // or http response
  } else if (value.hasOwnProperty('httpVersion')) {
    callback(null, +value.headers['content-length']);

  // or request stream http://github.com/mikeal/request
  } else if (value.hasOwnProperty('httpModule')) {
    // wait till response come back
    value.on('response', function(response) {
      value.pause();
      callback(null, +response.headers['content-length']);
    });
    value.resume();

  // something else
  } else {
    callback('Unknown stream');
  }
};

FormData.prototype._multiPartHeader = function(field, value, options) {
  // custom header specified (as string)?
  // it becomes responsible for boundary
  // (e.g. to handle extra CRLFs on .NET servers)
  if (typeof options.header == 'string') {
    return options.header;
  }

  var contentDisposition = this._getContentDisposition(value, options);
  var contentType = this._getContentType(value, options);

  var contents = '';
  var headers  = {
    // add custom disposition as third element or keep it two elements if not
    'Content-Disposition': ['form-data', 'name="' + field + '"'].concat(contentDisposition || []),
    // if no content type. allow it to be empty array
    'Content-Type': [].concat(contentType || [])
  };

  // allow custom headers.
  if (typeof options.header == 'object') {
    populate(headers, options.header);
  }

  var header;
  for (var prop in headers) {
    if (!headers.hasOwnProperty(prop)) continue;
    header = headers[prop];

    // skip nullish headers.
    if (header == null) {
      continue;
    }

    // convert all headers to arrays.
    if (!Array.isArray(header)) {
      header = [header];
    }

    // add non-empty headers.
    if (header.length) {
      contents += prop + ': ' + header.join('; ') + FormData.LINE_BREAK;
    }
  }

  return '--' + this.getBoundary() + FormData.LINE_BREAK + contents + FormData.LINE_BREAK;
};

FormData.prototype._getContentDisposition = function(value, options) {

  var filename
    , contentDisposition
    ;

  if (typeof options.filepath === 'string') {
    // custom filepath for relative paths
    filename = path.normalize(options.filepath).replace(/\\/g, '/');
  } else if (options.filename || value.name || value.path) {
    // custom filename take precedence
    // formidable and the browser add a name property
    // fs- and request- streams have path property
    filename = path.basename(options.filename || value.name || value.path);
  } else if (value.readable && value.hasOwnProperty('httpVersion')) {
    // or try http response
    filename = path.basename(value.client._httpMessage.path || '');
  }

  if (filename) {
    contentDisposition = 'filename="' + filename + '"';
  }

  return contentDisposition;
};

FormData.prototype._getContentType = function(value, options) {

  // use custom content-type above all
  var contentType = options.contentType;

  // or try `name` from formidable, browser
  if (!contentType && value.name) {
    contentType = mime.lookup(value.name);
  }

  // or try `path` from fs-, request- streams
  if (!contentType && value.path) {
    contentType = mime.lookup(value.path);
  }

  // or if it's http-reponse
  if (!contentType && value.readable && value.hasOwnProperty('httpVersion')) {
    contentType = value.headers['content-type'];
  }

  // or guess it from the filepath or filename
  if (!contentType && (options.filepath || options.filename)) {
    contentType = mime.lookup(options.filepath || options.filename);
  }

  // fallback to the default content type if `value` is not simple value
  if (!contentType && typeof value == 'object') {
    contentType = FormData.DEFAULT_CONTENT_TYPE;
  }

  return contentType;
};

FormData.prototype._multiPartFooter = function() {
  return function(next) {
    var footer = FormData.LINE_BREAK;

    var lastPart = (this._streams.length === 0);
    if (lastPart) {
      footer += this._lastBoundary();
    }

    next(footer);
  }.bind(this);
};

FormData.prototype._lastBoundary = function() {
  return '--' + this.getBoundary() + '--' + FormData.LINE_BREAK;
};

FormData.prototype.getHeaders = function(userHeaders) {
  var header;
  var formHeaders = {
    'content-type': 'multipart/form-data; boundary=' + this.getBoundary()
  };

  for (header in userHeaders) {
    if (userHeaders.hasOwnProperty(header)) {
      formHeaders[header.toLowerCase()] = userHeaders[header];
    }
  }

  return formHeaders;
};

FormData.prototype.setBoundary = function(boundary) {
  this._boundary = boundary;
};

FormData.prototype.getBoundary = function() {
  if (!this._boundary) {
    this._generateBoundary();
  }

  return this._boundary;
};

FormData.prototype.getBuffer = function() {
  var dataBuffer = new Buffer.alloc( 0 );
  var boundary = this.getBoundary();

  // Create the form content. Add Line breaks to the end of data.
  for (var i = 0, len = this._streams.length; i < len; i++) {
    if (typeof this._streams[i] !== 'function') {

      // Add content to the buffer.
      if(Buffer.isBuffer(this._streams[i])) {
        dataBuffer = Buffer.concat( [dataBuffer, this._streams[i]]);
      }else {
        dataBuffer = Buffer.concat( [dataBuffer, Buffer.from(this._streams[i])]);
      }

      // Add break after content.
      if (typeof this._streams[i] !== 'string' || this._streams[i].substring( 2, boundary.length + 2 ) !== boundary) {
        dataBuffer = Buffer.concat( [dataBuffer, Buffer.from(FormData.LINE_BREAK)] );
      }
    }
  }

  // Add the footer and return the Buffer object.
  return Buffer.concat( [dataBuffer, Buffer.from(this._lastBoundary())] );
};

FormData.prototype._generateBoundary = function() {
  // This generates a 50 character boundary similar to those used by Firefox.
  // They are optimized for boyer-moore parsing.
  var boundary = '--------------------------';
  for (var i = 0; i < 24; i++) {
    boundary += Math.floor(Math.random() * 10).toString(16);
  }

  this._boundary = boundary;
};

// Note: getLengthSync DOESN'T calculate streams length
// As workaround one can calculate file size manually
// and add it as knownLength option
FormData.prototype.getLengthSync = function() {
  var knownLength = this._overheadLength + this._valueLength;

  // Don't get confused, there are 3 "internal" streams for each keyval pair
  // so it basically checks if there is any value added to the form
  if (this._streams.length) {
    knownLength += this._lastBoundary().length;
  }

  // https://github.com/form-data/form-data/issues/40
  if (!this.hasKnownLength()) {
    // Some async length retrievers are present
    // therefore synchronous length calculation is false.
    // Please use getLength(callback) to get proper length
    this._error(new Error('Cannot calculate proper length in synchronous way.'));
  }

  return knownLength;
};

// Public API to check if length of added values is known
// https://github.com/form-data/form-data/issues/196
// https://github.com/form-data/form-data/issues/262
FormData.prototype.hasKnownLength = function() {
  var hasKnownLength = true;

  if (this._valuesToMeasure.length) {
    hasKnownLength = false;
  }

  return hasKnownLength;
};

FormData.prototype.getLength = function(cb) {
  var knownLength = this._overheadLength + this._valueLength;

  if (this._streams.length) {
    knownLength += this._lastBoundary().length;
  }

  if (!this._valuesToMeasure.length) {
    process.nextTick(cb.bind(this, null, knownLength));
    return;
  }

  asynckit.parallel(this._valuesToMeasure, this._lengthRetriever, function(err, values) {
    if (err) {
      cb(err);
      return;
    }

    values.forEach(function(length) {
      knownLength += length;
    });

    cb(null, knownLength);
  });
};

FormData.prototype.submit = function(params, cb) {
  var request
    , options
    , defaults = {method: 'post'}
    ;

  // parse provided url if it's string
  // or treat it as options object
  if (typeof params == 'string') {

    params = parseUrl(params);
    options = populate({
      port: params.port,
      path: params.pathname,
      host: params.hostname,
      protocol: params.protocol
    }, defaults);

  // use custom params
  } else {

    options = populate(params, defaults);
    // if no port provided use default one
    if (!options.port) {
      options.port = options.protocol == 'https:' ? 443 : 80;
    }
  }

  // put that good code in getHeaders to some use
  options.headers = this.getHeaders(params.headers);

  // https if specified, fallback to http in any other case
  if (options.protocol == 'https:') {
    request = https.request(options);
  } else {
    request = http.request(options);
  }

  // get content length and fire away
  this.getLength(function(err, length) {
    if (err) {
      this._error(err);
      return;
    }

    // add content length
    request.setHeader('Content-Length', length);

    this.pipe(request);
    if (cb) {
      var onResponse;

      var callback = function (error, responce) {
        request.removeListener('error', callback);
        request.removeListener('response', onResponse);

        return cb.call(this, error, responce);
      };

      onResponse = callback.bind(this, null);

      request.on('error', callback);
      request.on('response', onResponse);
    }
  }.bind(this));

  return request;
};

FormData.prototype._error = function(err) {
  if (!this.error) {
    this.error = err;
    this.pause();
    this.emit('error', err);
  }
};

FormData.prototype.toString = function () {
  return '[object FormData]';
};


/***/ }),

/***/ 5751:
/***/ ((module) => {

// populates missing values
module.exports = function(dst, src) {

  Object.keys(src).forEach(function(prop)
  {
    dst[prop] = dst[prop] || src[prop];
  });

  return dst;
};


/***/ }),

/***/ 5443:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var util = __nccwpck_require__(1669);
var Stream = __nccwpck_require__(2413).Stream;
var DelayedStream = __nccwpck_require__(8611);

module.exports = CombinedStream;
function CombinedStream() {
  this.writable = false;
  this.readable = true;
  this.dataSize = 0;
  this.maxDataSize = 2 * 1024 * 1024;
  this.pauseStreams = true;

  this._released = false;
  this._streams = [];
  this._currentStream = null;
  this._insideLoop = false;
  this._pendingNext = false;
}
util.inherits(CombinedStream, Stream);

CombinedStream.create = function(options) {
  var combinedStream = new this();

  options = options || {};
  for (var option in options) {
    combinedStream[option] = options[option];
  }

  return combinedStream;
};

CombinedStream.isStreamLike = function(stream) {
  return (typeof stream !== 'function')
    && (typeof stream !== 'string')
    && (typeof stream !== 'boolean')
    && (typeof stream !== 'number')
    && (!Buffer.isBuffer(stream));
};

CombinedStream.prototype.append = function(stream) {
  var isStreamLike = CombinedStream.isStreamLike(stream);

  if (isStreamLike) {
    if (!(stream instanceof DelayedStream)) {
      var newStream = DelayedStream.create(stream, {
        maxDataSize: Infinity,
        pauseStream: this.pauseStreams,
      });
      stream.on('data', this._checkDataSize.bind(this));
      stream = newStream;
    }

    this._handleErrors(stream);

    if (this.pauseStreams) {
      stream.pause();
    }
  }

  this._streams.push(stream);
  return this;
};

CombinedStream.prototype.pipe = function(dest, options) {
  Stream.prototype.pipe.call(this, dest, options);
  this.resume();
  return dest;
};

CombinedStream.prototype._getNext = function() {
  this._currentStream = null;

  if (this._insideLoop) {
    this._pendingNext = true;
    return; // defer call
  }

  this._insideLoop = true;
  try {
    do {
      this._pendingNext = false;
      this._realGetNext();
    } while (this._pendingNext);
  } finally {
    this._insideLoop = false;
  }
};

CombinedStream.prototype._realGetNext = function() {
  var stream = this._streams.shift();


  if (typeof stream == 'undefined') {
    this.end();
    return;
  }

  if (typeof stream !== 'function') {
    this._pipeNext(stream);
    return;
  }

  var getStream = stream;
  getStream(function(stream) {
    var isStreamLike = CombinedStream.isStreamLike(stream);
    if (isStreamLike) {
      stream.on('data', this._checkDataSize.bind(this));
      this._handleErrors(stream);
    }

    this._pipeNext(stream);
  }.bind(this));
};

CombinedStream.prototype._pipeNext = function(stream) {
  this._currentStream = stream;

  var isStreamLike = CombinedStream.isStreamLike(stream);
  if (isStreamLike) {
    stream.on('end', this._getNext.bind(this));
    stream.pipe(this, {end: false});
    return;
  }

  var value = stream;
  this.write(value);
  this._getNext();
};

CombinedStream.prototype._handleErrors = function(stream) {
  var self = this;
  stream.on('error', function(err) {
    self._emitError(err);
  });
};

CombinedStream.prototype.write = function(data) {
  this.emit('data', data);
};

CombinedStream.prototype.pause = function() {
  if (!this.pauseStreams) {
    return;
  }

  if(this.pauseStreams && this._currentStream && typeof(this._currentStream.pause) == 'function') this._currentStream.pause();
  this.emit('pause');
};

CombinedStream.prototype.resume = function() {
  if (!this._released) {
    this._released = true;
    this.writable = true;
    this._getNext();
  }

  if(this.pauseStreams && this._currentStream && typeof(this._currentStream.resume) == 'function') this._currentStream.resume();
  this.emit('resume');
};

CombinedStream.prototype.end = function() {
  this._reset();
  this.emit('end');
};

CombinedStream.prototype.destroy = function() {
  this._reset();
  this.emit('close');
};

CombinedStream.prototype._reset = function() {
  this.writable = false;
  this._streams = [];
  this._currentStream = null;
};

CombinedStream.prototype._checkDataSize = function() {
  this._updateDataSize();
  if (this.dataSize <= this.maxDataSize) {
    return;
  }

  var message =
    'DelayedStream#maxDataSize of ' + this.maxDataSize + ' bytes exceeded.';
  this._emitError(new Error(message));
};

CombinedStream.prototype._updateDataSize = function() {
  this.dataSize = 0;

  var self = this;
  this._streams.forEach(function(stream) {
    if (!stream.dataSize) {
      return;
    }

    self.dataSize += stream.dataSize;
  });

  if (this._currentStream && this._currentStream.dataSize) {
    this.dataSize += this._currentStream.dataSize;
  }
};

CombinedStream.prototype._emitError = function(err) {
  this._reset();
  this.emit('error', err);
};


/***/ }),

/***/ 8611:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var Stream = __nccwpck_require__(2413).Stream;
var util = __nccwpck_require__(1669);

module.exports = DelayedStream;
function DelayedStream() {
  this.source = null;
  this.dataSize = 0;
  this.maxDataSize = 1024 * 1024;
  this.pauseStream = true;

  this._maxDataSizeExceeded = false;
  this._released = false;
  this._bufferedEvents = [];
}
util.inherits(DelayedStream, Stream);

DelayedStream.create = function(source, options) {
  var delayedStream = new this();

  options = options || {};
  for (var option in options) {
    delayedStream[option] = options[option];
  }

  delayedStream.source = source;

  var realEmit = source.emit;
  source.emit = function() {
    delayedStream._handleEmit(arguments);
    return realEmit.apply(source, arguments);
  };

  source.on('error', function() {});
  if (delayedStream.pauseStream) {
    source.pause();
  }

  return delayedStream;
};

Object.defineProperty(DelayedStream.prototype, 'readable', {
  configurable: true,
  enumerable: true,
  get: function() {
    return this.source.readable;
  }
});

DelayedStream.prototype.setEncoding = function() {
  return this.source.setEncoding.apply(this.source, arguments);
};

DelayedStream.prototype.resume = function() {
  if (!this._released) {
    this.release();
  }

  this.source.resume();
};

DelayedStream.prototype.pause = function() {
  this.source.pause();
};

DelayedStream.prototype.release = function() {
  this._released = true;

  this._bufferedEvents.forEach(function(args) {
    this.emit.apply(this, args);
  }.bind(this));
  this._bufferedEvents = [];
};

DelayedStream.prototype.pipe = function() {
  var r = Stream.prototype.pipe.apply(this, arguments);
  this.resume();
  return r;
};

DelayedStream.prototype._handleEmit = function(args) {
  if (this._released) {
    this.emit.apply(this, args);
    return;
  }

  if (args[0] === 'data') {
    this.dataSize += args[1].length;
    this._checkIfMaxDataSizeExceeded();
  }

  this._bufferedEvents.push(args);
};

DelayedStream.prototype._checkIfMaxDataSizeExceeded = function() {
  if (this._maxDataSizeExceeded) {
    return;
  }

  if (this.dataSize <= this.maxDataSize) {
    return;
  }

  this._maxDataSizeExceeded = true;
  var message =
    'DelayedStream#maxDataSize of ' + this.maxDataSize + ' bytes exceeded.'
  this.emit('error', new Error(message));
};


/***/ }),

/***/ 3183:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var options_1 = __nccwpck_require__(6666);
var delay_factory_1 = __nccwpck_require__(8348);
function backOff(request, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var sanitizedOptions, backOff;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sanitizedOptions = options_1.getSanitizedOptions(options);
                    backOff = new BackOff(request, sanitizedOptions);
                    return [4 /*yield*/, backOff.execute()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.backOff = backOff;
var BackOff = /** @class */ (function () {
    function BackOff(request, options) {
        this.request = request;
        this.options = options;
        this.attemptNumber = 0;
    }
    BackOff.prototype.execute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1, shouldRetry;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.attemptLimitReached) return [3 /*break*/, 7];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 6]);
                        return [4 /*yield*/, this.applyDelay()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.request()];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        e_1 = _a.sent();
                        this.attemptNumber++;
                        return [4 /*yield*/, this.options.retry(e_1, this.attemptNumber)];
                    case 5:
                        shouldRetry = _a.sent();
                        if (!shouldRetry || this.attemptLimitReached) {
                            throw e_1;
                        }
                        return [3 /*break*/, 6];
                    case 6: return [3 /*break*/, 0];
                    case 7: throw new Error("Something went wrong.");
                }
            });
        });
    };
    Object.defineProperty(BackOff.prototype, "attemptLimitReached", {
        get: function () {
            return this.attemptNumber >= this.options.numOfAttempts;
        },
        enumerable: true,
        configurable: true
    });
    BackOff.prototype.applyDelay = function () {
        return __awaiter(this, void 0, void 0, function () {
            var delay;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        delay = delay_factory_1.DelayFactory(this.options, this.attemptNumber);
                        return [4 /*yield*/, delay.apply()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return BackOff;
}());
//# sourceMappingURL=backoff.js.map

/***/ }),

/***/ 5710:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
var delay_base_1 = __nccwpck_require__(7741);
var AlwaysDelay = /** @class */ (function (_super) {
    __extends(AlwaysDelay, _super);
    function AlwaysDelay() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AlwaysDelay;
}(delay_base_1.Delay));
exports.AlwaysDelay = AlwaysDelay;
//# sourceMappingURL=always.delay.js.map

/***/ }),

/***/ 7741:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var jitter_factory_1 = __nccwpck_require__(5229);
var Delay = /** @class */ (function () {
    function Delay(options) {
        this.options = options;
        this.attempt = 0;
    }
    Delay.prototype.apply = function () {
        var _this = this;
        return new Promise(function (resolve) { return setTimeout(resolve, _this.jitteredDelay); });
    };
    Delay.prototype.setAttemptNumber = function (attempt) {
        this.attempt = attempt;
    };
    Object.defineProperty(Delay.prototype, "jitteredDelay", {
        get: function () {
            var jitter = jitter_factory_1.JitterFactory(this.options);
            return jitter(this.delay);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Delay.prototype, "delay", {
        get: function () {
            var constant = this.options.startingDelay;
            var base = this.options.timeMultiple;
            var power = this.numOfDelayedAttempts;
            var delay = constant * Math.pow(base, power);
            return Math.min(delay, this.options.maxDelay);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Delay.prototype, "numOfDelayedAttempts", {
        get: function () {
            return this.attempt;
        },
        enumerable: true,
        configurable: true
    });
    return Delay;
}());
exports.Delay = Delay;
//# sourceMappingURL=delay.base.js.map

/***/ }),

/***/ 8348:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var skip_first_delay_1 = __nccwpck_require__(4317);
var always_delay_1 = __nccwpck_require__(5710);
function DelayFactory(options, attempt) {
    var delay = initDelayClass(options);
    delay.setAttemptNumber(attempt);
    return delay;
}
exports.DelayFactory = DelayFactory;
function initDelayClass(options) {
    if (!options.delayFirstAttempt) {
        return new skip_first_delay_1.SkipFirstDelay(options);
    }
    return new always_delay_1.AlwaysDelay(options);
}
//# sourceMappingURL=delay.factory.js.map

/***/ }),

/***/ 4317:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var delay_base_1 = __nccwpck_require__(7741);
var SkipFirstDelay = /** @class */ (function (_super) {
    __extends(SkipFirstDelay, _super);
    function SkipFirstDelay() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SkipFirstDelay.prototype.apply = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.isFirstAttempt ? true : _super.prototype.apply.call(this)];
            });
        });
    };
    Object.defineProperty(SkipFirstDelay.prototype, "isFirstAttempt", {
        get: function () {
            return this.attempt === 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkipFirstDelay.prototype, "numOfDelayedAttempts", {
        get: function () {
            return this.attempt - 1;
        },
        enumerable: true,
        configurable: true
    });
    return SkipFirstDelay;
}(delay_base_1.Delay));
exports.SkipFirstDelay = SkipFirstDelay;
//# sourceMappingURL=skip-first.delay.js.map

/***/ }),

/***/ 8571:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function fullJitter(delay) {
    var jitteredDelay = Math.random() * delay;
    return Math.round(jitteredDelay);
}
exports.fullJitter = fullJitter;
//# sourceMappingURL=full.jitter.js.map

/***/ }),

/***/ 5229:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var full_jitter_1 = __nccwpck_require__(8571);
var no_jitter_1 = __nccwpck_require__(2585);
function JitterFactory(options) {
    switch (options.jitter) {
        case "full":
            return full_jitter_1.fullJitter;
        case "none":
        default:
            return no_jitter_1.noJitter;
    }
}
exports.JitterFactory = JitterFactory;
//# sourceMappingURL=jitter.factory.js.map

/***/ }),

/***/ 2585:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function noJitter(delay) {
    return delay;
}
exports.noJitter = noJitter;
//# sourceMappingURL=no.jitter.js.map

/***/ }),

/***/ 6666:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var defaultOptions = {
    delayFirstAttempt: false,
    jitter: "none",
    maxDelay: Infinity,
    numOfAttempts: 10,
    retry: function () { return true; },
    startingDelay: 100,
    timeMultiple: 2
};
function getSanitizedOptions(options) {
    var sanitized = __assign(__assign({}, defaultOptions), options);
    if (sanitized.numOfAttempts < 1) {
        sanitized.numOfAttempts = 1;
    }
    return sanitized;
}
exports.getSanitizedOptions = getSanitizedOptions;
//# sourceMappingURL=options.js.map

/***/ }),

/***/ 7426:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

/*!
 * mime-db
 * Copyright(c) 2014 Jonathan Ong
 * MIT Licensed
 */

/**
 * Module exports.
 */

module.exports = __nccwpck_require__(3313)


/***/ }),

/***/ 3583:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";
/*!
 * mime-types
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module dependencies.
 * @private
 */

var db = __nccwpck_require__(7426)
var extname = __nccwpck_require__(5622).extname

/**
 * Module variables.
 * @private
 */

var EXTRACT_TYPE_REGEXP = /^\s*([^;\s]*)(?:;|\s|$)/
var TEXT_TYPE_REGEXP = /^text\//i

/**
 * Module exports.
 * @public
 */

exports.charset = charset
exports.charsets = { lookup: charset }
exports.contentType = contentType
exports.extension = extension
exports.extensions = Object.create(null)
exports.lookup = lookup
exports.types = Object.create(null)

// Populate the extensions/types maps
populateMaps(exports.extensions, exports.types)

/**
 * Get the default charset for a MIME type.
 *
 * @param {string} type
 * @return {boolean|string}
 */

function charset (type) {
  if (!type || typeof type !== 'string') {
    return false
  }

  // TODO: use media-typer
  var match = EXTRACT_TYPE_REGEXP.exec(type)
  var mime = match && db[match[1].toLowerCase()]

  if (mime && mime.charset) {
    return mime.charset
  }

  // default text/* to utf-8
  if (match && TEXT_TYPE_REGEXP.test(match[1])) {
    return 'UTF-8'
  }

  return false
}

/**
 * Create a full Content-Type header given a MIME type or extension.
 *
 * @param {string} str
 * @return {boolean|string}
 */

function contentType (str) {
  // TODO: should this even be in this module?
  if (!str || typeof str !== 'string') {
    return false
  }

  var mime = str.indexOf('/') === -1
    ? exports.lookup(str)
    : str

  if (!mime) {
    return false
  }

  // TODO: use content-type or other module
  if (mime.indexOf('charset') === -1) {
    var charset = exports.charset(mime)
    if (charset) mime += '; charset=' + charset.toLowerCase()
  }

  return mime
}

/**
 * Get the default extension for a MIME type.
 *
 * @param {string} type
 * @return {boolean|string}
 */

function extension (type) {
  if (!type || typeof type !== 'string') {
    return false
  }

  // TODO: use media-typer
  var match = EXTRACT_TYPE_REGEXP.exec(type)

  // get extensions
  var exts = match && exports.extensions[match[1].toLowerCase()]

  if (!exts || !exts.length) {
    return false
  }

  return exts[0]
}

/**
 * Lookup the MIME type for a file path/extension.
 *
 * @param {string} path
 * @return {boolean|string}
 */

function lookup (path) {
  if (!path || typeof path !== 'string') {
    return false
  }

  // get the extension ("ext" or ".ext" or full path)
  var extension = extname('x.' + path)
    .toLowerCase()
    .substr(1)

  if (!extension) {
    return false
  }

  return exports.types[extension] || false
}

/**
 * Populate the extensions and types maps.
 * @private
 */

function populateMaps (extensions, types) {
  // source preference (least -> most)
  var preference = ['nginx', 'apache', undefined, 'iana']

  Object.keys(db).forEach(function forEachMimeType (type) {
    var mime = db[type]
    var exts = mime.extensions

    if (!exts || !exts.length) {
      return
    }

    // mime -> extensions
    extensions[type] = exts

    // extension -> mime
    for (var i = 0; i < exts.length; i++) {
      var extension = exts[i]

      if (types[extension]) {
        var from = preference.indexOf(db[types[extension]].source)
        var to = preference.indexOf(mime.source)

        if (types[extension] !== 'application/octet-stream' &&
          (from > to || (from === to && types[extension].substr(0, 12) === 'application/'))) {
          // skip the remapping
          continue
        }
      }

      // set the extension -> mime
      types[extension] = type
    }
  })
}


/***/ }),

/***/ 3817:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = request
module.exports.raw = rawRequest
module.exports.isSuccessStatus = isSuccessStatus
module.exports.isErrorStatus = isErrorStatus

var url = __nccwpck_require__(8835)

// Lazily load these, since most likely only one is necessary
var _http, _https
var net = {
  http: function () {
    if (_http === undefined) _http = __nccwpck_require__(8605)
    return _http
  },
  https: function () {
    if (_https === undefined) _https = __nccwpck_require__(7211)
    return _https
  }
}

function isStream (o) {
  return o !== null && typeof o === 'object' && typeof o.pipe === 'function'
}

function once (fn) {
  var f = function () {
    if (f.called) return f.value
    f.called = true
    f.value = fn.apply(this, arguments)
    return f.value
  }
  f.called = false
  return f
}

function shallowCopy (target, source) {
  for (var key in source) {
    if (source.hasOwnProperty(key)) {
      target[key] = source[key]
    }
  }
  return target
}

function rawRequest (opts, cb) {
  opts = typeof opts === 'string' ? { url: opts } : shallowCopy(opts)
  cb = once(cb)

  if (opts.url) parseOptsUrl(opts)
  if (opts.headers == null) opts.headers = {}
  if (opts.maxRedirects == null) opts.maxRedirects = 10

  var body = opts.json ? JSON.stringify(opts.body) : opts.body
  opts.body = undefined
  if (body && !opts.method) opts.method = 'POST'
  if (opts.method) opts.method = opts.method.toUpperCase()
  if (opts.json) opts.headers['Accept'] = 'application/json'
  if (opts.json && body) opts.headers['Content-Type'] = 'application/json'

  // Support http: and https: urls
  var protocol = opts.protocol === 'https:' ? net.https() : net.http()
  var req = protocol.request(opts, function (res) {
    // Follow 3xx redirects
    if (res.statusCode >= 300 && res.statusCode < 400 && 'location' in res.headers) {
      opts.url = res.headers.location
      parseOptsUrl(opts)
      res.resume() // Discard response

      opts.maxRedirects -= 1
      if (opts.maxRedirects > 0) {
        opts.body = body
        rawRequest(opts, cb)
      } else {
        cb(new Error('too many redirects'))
      }
      return
    }
    cb(null, res)
  })
  req.on('timeout', () => {
    req.abort()
    cb(new Error('Request timed out'))
  })
  req.on('error', cb)
  if (isStream(body)) body.on('error', cb).pipe(req)
  else req.end(body)
  return req
}

function request (opts, cb) {
  if (cb === undefined) {
    if (typeof global.Promise === 'function') {
      return new Promise(function (resolve, reject) {
        request(opts, function (err, result) {
          if (err) reject(err)
          else resolve(result)
        })
      })
    }
    // Otherwise
    throw new Error('No callback was supplied, and global.Promise is not a function. You must provide an async interface')
  }
  return rawRequest(opts, function (err, res) {
    if (err) return cb(err)
    var chunks = []
    res.on('data', function (chunk) {
      chunks.push(chunk)
    })
    res.on('end', function () {
      var data = Buffer.concat(chunks)
      if (opts.json) {
        if (data.length === 0) return cb(err, res, null)
        try {
          data = JSON.parse(data.toString())
          res.data = data
        } catch (err) {
          return cb(err, res, data)
        }
      } else {
        res.data = data
      }
      cb(null, res, data)
    })
  })
}

;['get', 'post', 'put', 'patch', 'head', 'delete'].forEach(function (method) {
  module.exports[method] = function (opts, cb) {
    if (typeof opts === 'string') opts = { url: opts }
    opts.method = method.toUpperCase()
    return request(opts, cb)
  }
})

function parseOptsUrl (opts) {
  var loc = url.parse(opts.url)
  if (loc.hostname) opts.hostname = loc.hostname
  if (loc.port) opts.port = loc.port
  if (loc.protocol) opts.protocol = loc.protocol
  if (loc.auth) opts.auth = loc.auth
  opts.path = loc.path
  delete opts.url
}

function isSuccessStatus (response) {
  return response.statusCode.toString()[0] === '2'
}

function isErrorStatus (response) {
  return !isSuccessStatus(response)
}


/***/ }),

/***/ 4351:
/***/ ((module) => {

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global global, define, System, Reflect, Promise */
var __extends;
var __assign;
var __rest;
var __decorate;
var __param;
var __metadata;
var __awaiter;
var __generator;
var __exportStar;
var __values;
var __read;
var __spread;
var __spreadArrays;
var __await;
var __asyncGenerator;
var __asyncDelegator;
var __asyncValues;
var __makeTemplateObject;
var __importStar;
var __importDefault;
(function (factory) {
    var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
    if (typeof define === "function" && define.amd) {
        define("tslib", ["exports"], function (exports) { factory(createExporter(root, createExporter(exports))); });
    }
    else if ( true && typeof module.exports === "object") {
        factory(createExporter(root, createExporter(module.exports)));
    }
    else {
        factory(createExporter(root));
    }
    function createExporter(exports, previous) {
        if (exports !== root) {
            if (typeof Object.create === "function") {
                Object.defineProperty(exports, "__esModule", { value: true });
            }
            else {
                exports.__esModule = true;
            }
        }
        return function (id, v) { return exports[id] = previous ? previous(id, v) : v; };
    }
})
(function (exporter) {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

    __extends = function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };

    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };

    __rest = function (s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    };

    __decorate = function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };

    __param = function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };

    __metadata = function (metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    };

    __awaiter = function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };

    __generator = function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };

    __exportStar = function (m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    };

    __values = function (o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    };

    __read = function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };

    __spread = function () {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    };

    __spreadArrays = function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    __await = function (v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    };

    __asyncGenerator = function (thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);  }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    };

    __asyncDelegator = function (o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    };

    __asyncValues = function (o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    };

    __makeTemplateObject = function (cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    __importStar = function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result["default"] = mod;
        return result;
    };

    __importDefault = function (mod) {
        return (mod && mod.__esModule) ? mod : { "default": mod };
    };

    exporter("__extends", __extends);
    exporter("__assign", __assign);
    exporter("__rest", __rest);
    exporter("__decorate", __decorate);
    exporter("__param", __param);
    exporter("__metadata", __metadata);
    exporter("__awaiter", __awaiter);
    exporter("__generator", __generator);
    exporter("__exportStar", __exportStar);
    exporter("__values", __values);
    exporter("__read", __read);
    exporter("__spread", __spread);
    exporter("__spreadArrays", __spreadArrays);
    exporter("__await", __await);
    exporter("__asyncGenerator", __asyncGenerator);
    exporter("__asyncDelegator", __asyncDelegator);
    exporter("__asyncValues", __asyncValues);
    exporter("__makeTemplateObject", __makeTemplateObject);
    exporter("__importStar", __importStar);
    exporter("__importDefault", __importDefault);
});


/***/ }),

/***/ 2821:
/***/ (function(module) {

(function (name, context, definition) {
  if ( true && module.exports) module.exports = definition();
  else if (typeof define === 'function' && define.amd) define(definition);
  else context[name] = definition();
})('urljoin', this, function () {

  function normalize (strArray) {
    var resultArray = [];
    if (strArray.length === 0) { return ''; }

    if (typeof strArray[0] !== 'string') {
      throw new TypeError('Url must be a string. Received ' + strArray[0]);
    }

    // If the first part is a plain protocol, we combine it with the next part.
    if (strArray[0].match(/^[^/:]+:\/*$/) && strArray.length > 1) {
      var first = strArray.shift();
      strArray[0] = first + strArray[0];
    }

    // There must be two or three slashes in the file protocol, two slashes in anything else.
    if (strArray[0].match(/^file:\/\/\//)) {
      strArray[0] = strArray[0].replace(/^([^/:]+):\/*/, '$1:///');
    } else {
      strArray[0] = strArray[0].replace(/^([^/:]+):\/*/, '$1://');
    }

    for (var i = 0; i < strArray.length; i++) {
      var component = strArray[i];

      if (typeof component !== 'string') {
        throw new TypeError('Url must be a string. Received ' + component);
      }

      if (component === '') { continue; }

      if (i > 0) {
        // Removing the starting slashes for each component but the first.
        component = component.replace(/^[\/]+/, '');
      }
      if (i < strArray.length - 1) {
        // Removing the ending slashes for each component but the last.
        component = component.replace(/[\/]+$/, '');
      } else {
        // For the last component we will combine multiple slashes to a single one.
        component = component.replace(/[\/]+$/, '/');
      }

      resultArray.push(component);

    }

    var str = resultArray.join('/');
    // Each input component is now separated by a single slash except the possible first plain protocol part.

    // remove trailing slash before parameters or hash
    str = str.replace(/\/(\?|&|#[^!])/g, '$1');

    // replace ? in parameters with &
    var parts = str.split('?');
    str = parts.shift() + (parts.length > 0 ? '?': '') + parts.join('&');

    return str;
  }

  return function () {
    var input;

    if (typeof arguments[0] === 'object') {
      input = arguments[0];
    } else {
      input = [].slice.call(arguments);
    }

    return normalize(input);
  };

});


/***/ }),

/***/ 2626:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"_args":[["cerberus-node-client@3.3.5","/Users/jmic10/nike/ghec/nike-auto/actions-cerberus-secrets"]],"_from":"cerberus-node-client@3.3.5","_id":"cerberus-node-client@3.3.5","_inBundle":false,"_integrity":"sha512-gtzjF9ufmvzFHhg6I4vrkTumoTTjJYUdi4t6wrXSH6wpaFDvo38/DutpdFLc8vaDLuMBGIPYnCoyQWwUK8olCA==","_location":"/cerberus-node-client","_phantomChildren":{"asynckit":"0.4.0","combined-stream":"1.0.8","mime-types":"2.1.25"},"_requested":{"type":"version","registry":true,"raw":"cerberus-node-client@3.3.5","name":"cerberus-node-client","escapedName":"cerberus-node-client","rawSpec":"3.3.5","saveSpec":null,"fetchSpec":"3.3.5"},"_requiredBy":["/"],"_resolved":"https://registry.npmjs.org/cerberus-node-client/-/cerberus-node-client-3.3.5.tgz","_spec":"3.3.5","_where":"/Users/jmic10/nike/ghec/nike-auto/actions-cerberus-secrets","author":{"name":"Tim Kye"},"bugs":{"url":"https://github.com/Nike-Inc/cerberus-node-client/issues"},"dependencies":{"@aws-sdk/credential-provider-node":"1.0.0-gamma.1","exponential-backoff":"^3.1.0","form-data":"^3.0.0","request-micro":"^1.5.1","url-join":"^4.0.1"},"description":"Node client for Cerberus Key Mgmt","devDependencies":{"babel-eslint":"^10.1.0","coveralls":"^3.1.0","eslint":"^7.3.1","gh-pages":"^3.1.0","ink-docstrap":"^1.3.2","jest":"^26.6.3","jest-mock-console":"^1.0.1","jsdoc":"^3.6.4","minimist":"^1.2.5","nyc":"^15.1.0","snazzy":"^8.0.0","standard":"^14.3.4","tap-spec":"^5.0.0","uuid":"^8.2.0"},"engines":{"node":">=4.0.0"},"files":["index.js","index.d.ts","lib"],"homepage":"https://github.com/Nike-Inc/cerberus-node-client#readme","keywords":["nike","cerberus"],"license":"Apache-2.0","main":"index.js","name":"cerberus-node-client","repository":{"type":"git","url":"git+https://github.com/Nike-Inc/cerberus-node-client.git"},"scripts":{"deploy-docs":"gh-pages -d build/docs","generate-docs":"./scripts/generate-docs.sh","style":"standard \\"index.js\\" \\"test/**/*.js\\" | snazzy","style:fix":"standard \\"index.js\\" \\"test/**/*.js\\" --fix","test":"npm run style && npm run test:unit:local","test:all":"npm run style && npm run test:unit:local && npm run test:integration","test:integration":"PROJECT_DIR=$(pwd) jest integration/","test:unit:ci-report-coverage":"jest test/ --coverage --coverageReporters=text-lcov --collectCoverageFrom=lib/**/*.js --collectCoverageFrom=index.js --collectCoverageFrom=!lib/sts.js | coveralls","test:unit:local":"jest test/ --coverage --collectCoverageFrom=lib/**/*.js --collectCoverageFrom=index.js --collectCoverageFrom=!lib/sts.js","travis-deploy-github-pages":"gh-pages -r \\"https://${GH_TOKEN}@github.com/Nike-Inc/cerberus-node-client.git\\" -d build/docs"},"standard":{"parser":"babel-eslint","env":"jest"},"types":"index.d.ts","version":"3.3.5"}');

/***/ }),

/***/ 3313:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"application/1d-interleaved-parityfec":{"source":"iana"},"application/3gpdash-qoe-report+xml":{"source":"iana","compressible":true},"application/3gpp-ims+xml":{"source":"iana","compressible":true},"application/a2l":{"source":"iana"},"application/activemessage":{"source":"iana"},"application/activity+json":{"source":"iana","compressible":true},"application/alto-costmap+json":{"source":"iana","compressible":true},"application/alto-costmapfilter+json":{"source":"iana","compressible":true},"application/alto-directory+json":{"source":"iana","compressible":true},"application/alto-endpointcost+json":{"source":"iana","compressible":true},"application/alto-endpointcostparams+json":{"source":"iana","compressible":true},"application/alto-endpointprop+json":{"source":"iana","compressible":true},"application/alto-endpointpropparams+json":{"source":"iana","compressible":true},"application/alto-error+json":{"source":"iana","compressible":true},"application/alto-networkmap+json":{"source":"iana","compressible":true},"application/alto-networkmapfilter+json":{"source":"iana","compressible":true},"application/aml":{"source":"iana"},"application/andrew-inset":{"source":"iana","extensions":["ez"]},"application/applefile":{"source":"iana"},"application/applixware":{"source":"apache","extensions":["aw"]},"application/atf":{"source":"iana"},"application/atfx":{"source":"iana"},"application/atom+xml":{"source":"iana","compressible":true,"extensions":["atom"]},"application/atomcat+xml":{"source":"iana","compressible":true,"extensions":["atomcat"]},"application/atomdeleted+xml":{"source":"iana","compressible":true},"application/atomicmail":{"source":"iana"},"application/atomsvc+xml":{"source":"iana","compressible":true,"extensions":["atomsvc"]},"application/atsc-dwd+xml":{"source":"iana","compressible":true},"application/atsc-held+xml":{"source":"iana","compressible":true},"application/atsc-rsat+xml":{"source":"iana","compressible":true},"application/atxml":{"source":"iana"},"application/auth-policy+xml":{"source":"iana","compressible":true},"application/bacnet-xdd+zip":{"source":"iana","compressible":false},"application/batch-smtp":{"source":"iana"},"application/bdoc":{"compressible":false,"extensions":["bdoc"]},"application/beep+xml":{"source":"iana","compressible":true},"application/calendar+json":{"source":"iana","compressible":true},"application/calendar+xml":{"source":"iana","compressible":true},"application/call-completion":{"source":"iana"},"application/cals-1840":{"source":"iana"},"application/cbor":{"source":"iana"},"application/cccex":{"source":"iana"},"application/ccmp+xml":{"source":"iana","compressible":true},"application/ccxml+xml":{"source":"iana","compressible":true,"extensions":["ccxml"]},"application/cdfx+xml":{"source":"iana","compressible":true},"application/cdmi-capability":{"source":"iana","extensions":["cdmia"]},"application/cdmi-container":{"source":"iana","extensions":["cdmic"]},"application/cdmi-domain":{"source":"iana","extensions":["cdmid"]},"application/cdmi-object":{"source":"iana","extensions":["cdmio"]},"application/cdmi-queue":{"source":"iana","extensions":["cdmiq"]},"application/cdni":{"source":"iana"},"application/cea":{"source":"iana"},"application/cea-2018+xml":{"source":"iana","compressible":true},"application/cellml+xml":{"source":"iana","compressible":true},"application/cfw":{"source":"iana"},"application/clue_info+xml":{"source":"iana","compressible":true},"application/cms":{"source":"iana"},"application/cnrp+xml":{"source":"iana","compressible":true},"application/coap-group+json":{"source":"iana","compressible":true},"application/coap-payload":{"source":"iana"},"application/commonground":{"source":"iana"},"application/conference-info+xml":{"source":"iana","compressible":true},"application/cose":{"source":"iana"},"application/cose-key":{"source":"iana"},"application/cose-key-set":{"source":"iana"},"application/cpl+xml":{"source":"iana","compressible":true},"application/csrattrs":{"source":"iana"},"application/csta+xml":{"source":"iana","compressible":true},"application/cstadata+xml":{"source":"iana","compressible":true},"application/csvm+json":{"source":"iana","compressible":true},"application/cu-seeme":{"source":"apache","extensions":["cu"]},"application/cwt":{"source":"iana"},"application/cybercash":{"source":"iana"},"application/dart":{"compressible":true},"application/dash+xml":{"source":"iana","compressible":true,"extensions":["mpd"]},"application/dashdelta":{"source":"iana"},"application/davmount+xml":{"source":"iana","compressible":true,"extensions":["davmount"]},"application/dca-rft":{"source":"iana"},"application/dcd":{"source":"iana"},"application/dec-dx":{"source":"iana"},"application/dialog-info+xml":{"source":"iana","compressible":true},"application/dicom":{"source":"iana"},"application/dicom+json":{"source":"iana","compressible":true},"application/dicom+xml":{"source":"iana","compressible":true},"application/dii":{"source":"iana"},"application/dit":{"source":"iana"},"application/dns":{"source":"iana"},"application/dns+json":{"source":"iana","compressible":true},"application/dns-message":{"source":"iana"},"application/docbook+xml":{"source":"apache","compressible":true,"extensions":["dbk"]},"application/dskpp+xml":{"source":"iana","compressible":true},"application/dssc+der":{"source":"iana","extensions":["dssc"]},"application/dssc+xml":{"source":"iana","compressible":true,"extensions":["xdssc"]},"application/dvcs":{"source":"iana"},"application/ecmascript":{"source":"iana","compressible":true,"extensions":["ecma","es"]},"application/edi-consent":{"source":"iana"},"application/edi-x12":{"source":"iana","compressible":false},"application/edifact":{"source":"iana","compressible":false},"application/efi":{"source":"iana"},"application/emergencycalldata.comment+xml":{"source":"iana","compressible":true},"application/emergencycalldata.control+xml":{"source":"iana","compressible":true},"application/emergencycalldata.deviceinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.ecall.msd":{"source":"iana"},"application/emergencycalldata.providerinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.serviceinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.subscriberinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.veds+xml":{"source":"iana","compressible":true},"application/emma+xml":{"source":"iana","compressible":true,"extensions":["emma"]},"application/emotionml+xml":{"source":"iana","compressible":true},"application/encaprtp":{"source":"iana"},"application/epp+xml":{"source":"iana","compressible":true},"application/epub+zip":{"source":"iana","compressible":false,"extensions":["epub"]},"application/eshop":{"source":"iana"},"application/exi":{"source":"iana","extensions":["exi"]},"application/expect-ct-report+json":{"source":"iana","compressible":true},"application/fastinfoset":{"source":"iana"},"application/fastsoap":{"source":"iana"},"application/fdt+xml":{"source":"iana","compressible":true},"application/fhir+json":{"source":"iana","compressible":true},"application/fhir+xml":{"source":"iana","compressible":true},"application/fido.trusted-apps+json":{"compressible":true},"application/fits":{"source":"iana"},"application/flexfec":{"source":"iana"},"application/font-sfnt":{"source":"iana"},"application/font-tdpfr":{"source":"iana","extensions":["pfr"]},"application/font-woff":{"source":"iana","compressible":false},"application/framework-attributes+xml":{"source":"iana","compressible":true},"application/geo+json":{"source":"iana","compressible":true,"extensions":["geojson"]},"application/geo+json-seq":{"source":"iana"},"application/geopackage+sqlite3":{"source":"iana"},"application/geoxacml+xml":{"source":"iana","compressible":true},"application/gltf-buffer":{"source":"iana"},"application/gml+xml":{"source":"iana","compressible":true,"extensions":["gml"]},"application/gpx+xml":{"source":"apache","compressible":true,"extensions":["gpx"]},"application/gxf":{"source":"apache","extensions":["gxf"]},"application/gzip":{"source":"iana","compressible":false,"extensions":["gz"]},"application/h224":{"source":"iana"},"application/held+xml":{"source":"iana","compressible":true},"application/hjson":{"extensions":["hjson"]},"application/http":{"source":"iana"},"application/hyperstudio":{"source":"iana","extensions":["stk"]},"application/ibe-key-request+xml":{"source":"iana","compressible":true},"application/ibe-pkg-reply+xml":{"source":"iana","compressible":true},"application/ibe-pp-data":{"source":"iana"},"application/iges":{"source":"iana"},"application/im-iscomposing+xml":{"source":"iana","compressible":true},"application/index":{"source":"iana"},"application/index.cmd":{"source":"iana"},"application/index.obj":{"source":"iana"},"application/index.response":{"source":"iana"},"application/index.vnd":{"source":"iana"},"application/inkml+xml":{"source":"iana","compressible":true,"extensions":["ink","inkml"]},"application/iotp":{"source":"iana"},"application/ipfix":{"source":"iana","extensions":["ipfix"]},"application/ipp":{"source":"iana"},"application/isup":{"source":"iana"},"application/its+xml":{"source":"iana","compressible":true},"application/java-archive":{"source":"apache","compressible":false,"extensions":["jar","war","ear"]},"application/java-serialized-object":{"source":"apache","compressible":false,"extensions":["ser"]},"application/java-vm":{"source":"apache","compressible":false,"extensions":["class"]},"application/javascript":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["js","mjs"]},"application/jf2feed+json":{"source":"iana","compressible":true},"application/jose":{"source":"iana"},"application/jose+json":{"source":"iana","compressible":true},"application/jrd+json":{"source":"iana","compressible":true},"application/json":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["json","map"]},"application/json-patch+json":{"source":"iana","compressible":true},"application/json-seq":{"source":"iana"},"application/json5":{"extensions":["json5"]},"application/jsonml+json":{"source":"apache","compressible":true,"extensions":["jsonml"]},"application/jwk+json":{"source":"iana","compressible":true},"application/jwk-set+json":{"source":"iana","compressible":true},"application/jwt":{"source":"iana"},"application/kpml-request+xml":{"source":"iana","compressible":true},"application/kpml-response+xml":{"source":"iana","compressible":true},"application/ld+json":{"source":"iana","compressible":true,"extensions":["jsonld"]},"application/lgr+xml":{"source":"iana","compressible":true},"application/link-format":{"source":"iana"},"application/load-control+xml":{"source":"iana","compressible":true},"application/lost+xml":{"source":"iana","compressible":true,"extensions":["lostxml"]},"application/lostsync+xml":{"source":"iana","compressible":true},"application/lxf":{"source":"iana"},"application/mac-binhex40":{"source":"iana","extensions":["hqx"]},"application/mac-compactpro":{"source":"apache","extensions":["cpt"]},"application/macwriteii":{"source":"iana"},"application/mads+xml":{"source":"iana","compressible":true,"extensions":["mads"]},"application/manifest+json":{"charset":"UTF-8","compressible":true,"extensions":["webmanifest"]},"application/marc":{"source":"iana","extensions":["mrc"]},"application/marcxml+xml":{"source":"iana","compressible":true,"extensions":["mrcx"]},"application/mathematica":{"source":"iana","extensions":["ma","nb","mb"]},"application/mathml+xml":{"source":"iana","compressible":true,"extensions":["mathml"]},"application/mathml-content+xml":{"source":"iana","compressible":true},"application/mathml-presentation+xml":{"source":"iana","compressible":true},"application/mbms-associated-procedure-description+xml":{"source":"iana","compressible":true},"application/mbms-deregister+xml":{"source":"iana","compressible":true},"application/mbms-envelope+xml":{"source":"iana","compressible":true},"application/mbms-msk+xml":{"source":"iana","compressible":true},"application/mbms-msk-response+xml":{"source":"iana","compressible":true},"application/mbms-protection-description+xml":{"source":"iana","compressible":true},"application/mbms-reception-report+xml":{"source":"iana","compressible":true},"application/mbms-register+xml":{"source":"iana","compressible":true},"application/mbms-register-response+xml":{"source":"iana","compressible":true},"application/mbms-schedule+xml":{"source":"iana","compressible":true},"application/mbms-user-service-description+xml":{"source":"iana","compressible":true},"application/mbox":{"source":"iana","extensions":["mbox"]},"application/media-policy-dataset+xml":{"source":"iana","compressible":true},"application/media_control+xml":{"source":"iana","compressible":true},"application/mediaservercontrol+xml":{"source":"iana","compressible":true,"extensions":["mscml"]},"application/merge-patch+json":{"source":"iana","compressible":true},"application/metalink+xml":{"source":"apache","compressible":true,"extensions":["metalink"]},"application/metalink4+xml":{"source":"iana","compressible":true,"extensions":["meta4"]},"application/mets+xml":{"source":"iana","compressible":true,"extensions":["mets"]},"application/mf4":{"source":"iana"},"application/mikey":{"source":"iana"},"application/mipc":{"source":"iana"},"application/mmt-aei+xml":{"source":"iana","compressible":true},"application/mmt-usd+xml":{"source":"iana","compressible":true},"application/mods+xml":{"source":"iana","compressible":true,"extensions":["mods"]},"application/moss-keys":{"source":"iana"},"application/moss-signature":{"source":"iana"},"application/mosskey-data":{"source":"iana"},"application/mosskey-request":{"source":"iana"},"application/mp21":{"source":"iana","extensions":["m21","mp21"]},"application/mp4":{"source":"iana","extensions":["mp4s","m4p"]},"application/mpeg4-generic":{"source":"iana"},"application/mpeg4-iod":{"source":"iana"},"application/mpeg4-iod-xmt":{"source":"iana"},"application/mrb-consumer+xml":{"source":"iana","compressible":true},"application/mrb-publish+xml":{"source":"iana","compressible":true},"application/msc-ivr+xml":{"source":"iana","compressible":true},"application/msc-mixer+xml":{"source":"iana","compressible":true},"application/msword":{"source":"iana","compressible":false,"extensions":["doc","dot"]},"application/mud+json":{"source":"iana","compressible":true},"application/mxf":{"source":"iana","extensions":["mxf"]},"application/n-quads":{"source":"iana","extensions":["nq"]},"application/n-triples":{"source":"iana","extensions":["nt"]},"application/nasdata":{"source":"iana"},"application/news-checkgroups":{"source":"iana"},"application/news-groupinfo":{"source":"iana"},"application/news-transmission":{"source":"iana"},"application/nlsml+xml":{"source":"iana","compressible":true},"application/node":{"source":"iana"},"application/nss":{"source":"iana"},"application/ocsp-request":{"source":"iana"},"application/ocsp-response":{"source":"iana"},"application/octet-stream":{"source":"iana","compressible":false,"extensions":["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"]},"application/oda":{"source":"iana","extensions":["oda"]},"application/odm+xml":{"source":"iana","compressible":true},"application/odx":{"source":"iana"},"application/oebps-package+xml":{"source":"iana","compressible":true,"extensions":["opf"]},"application/ogg":{"source":"iana","compressible":false,"extensions":["ogx"]},"application/omdoc+xml":{"source":"apache","compressible":true,"extensions":["omdoc"]},"application/onenote":{"source":"apache","extensions":["onetoc","onetoc2","onetmp","onepkg"]},"application/oscore":{"source":"iana"},"application/oxps":{"source":"iana","extensions":["oxps"]},"application/p2p-overlay+xml":{"source":"iana","compressible":true},"application/parityfec":{"source":"iana"},"application/passport":{"source":"iana"},"application/patch-ops-error+xml":{"source":"iana","compressible":true,"extensions":["xer"]},"application/pdf":{"source":"iana","compressible":false,"extensions":["pdf"]},"application/pdx":{"source":"iana"},"application/pem-certificate-chain":{"source":"iana"},"application/pgp-encrypted":{"source":"iana","compressible":false,"extensions":["pgp"]},"application/pgp-keys":{"source":"iana"},"application/pgp-signature":{"source":"iana","extensions":["asc","sig"]},"application/pics-rules":{"source":"apache","extensions":["prf"]},"application/pidf+xml":{"source":"iana","compressible":true},"application/pidf-diff+xml":{"source":"iana","compressible":true},"application/pkcs10":{"source":"iana","extensions":["p10"]},"application/pkcs12":{"source":"iana"},"application/pkcs7-mime":{"source":"iana","extensions":["p7m","p7c"]},"application/pkcs7-signature":{"source":"iana","extensions":["p7s"]},"application/pkcs8":{"source":"iana","extensions":["p8"]},"application/pkcs8-encrypted":{"source":"iana"},"application/pkix-attr-cert":{"source":"iana","extensions":["ac"]},"application/pkix-cert":{"source":"iana","extensions":["cer"]},"application/pkix-crl":{"source":"iana","extensions":["crl"]},"application/pkix-pkipath":{"source":"iana","extensions":["pkipath"]},"application/pkixcmp":{"source":"iana","extensions":["pki"]},"application/pls+xml":{"source":"iana","compressible":true,"extensions":["pls"]},"application/poc-settings+xml":{"source":"iana","compressible":true},"application/postscript":{"source":"iana","compressible":true,"extensions":["ai","eps","ps"]},"application/ppsp-tracker+json":{"source":"iana","compressible":true},"application/problem+json":{"source":"iana","compressible":true},"application/problem+xml":{"source":"iana","compressible":true},"application/provenance+xml":{"source":"iana","compressible":true},"application/prs.alvestrand.titrax-sheet":{"source":"iana"},"application/prs.cww":{"source":"iana","extensions":["cww"]},"application/prs.hpub+zip":{"source":"iana","compressible":false},"application/prs.nprend":{"source":"iana"},"application/prs.plucker":{"source":"iana"},"application/prs.rdf-xml-crypt":{"source":"iana"},"application/prs.xsf+xml":{"source":"iana","compressible":true},"application/pskc+xml":{"source":"iana","compressible":true,"extensions":["pskcxml"]},"application/qsig":{"source":"iana"},"application/raml+yaml":{"compressible":true,"extensions":["raml"]},"application/raptorfec":{"source":"iana"},"application/rdap+json":{"source":"iana","compressible":true},"application/rdf+xml":{"source":"iana","compressible":true,"extensions":["rdf","owl"]},"application/reginfo+xml":{"source":"iana","compressible":true,"extensions":["rif"]},"application/relax-ng-compact-syntax":{"source":"iana","extensions":["rnc"]},"application/remote-printing":{"source":"iana"},"application/reputon+json":{"source":"iana","compressible":true},"application/resource-lists+xml":{"source":"iana","compressible":true,"extensions":["rl"]},"application/resource-lists-diff+xml":{"source":"iana","compressible":true,"extensions":["rld"]},"application/rfc+xml":{"source":"iana","compressible":true},"application/riscos":{"source":"iana"},"application/rlmi+xml":{"source":"iana","compressible":true},"application/rls-services+xml":{"source":"iana","compressible":true,"extensions":["rs"]},"application/route-apd+xml":{"source":"iana","compressible":true},"application/route-s-tsid+xml":{"source":"iana","compressible":true},"application/route-usd+xml":{"source":"iana","compressible":true},"application/rpki-ghostbusters":{"source":"iana","extensions":["gbr"]},"application/rpki-manifest":{"source":"iana","extensions":["mft"]},"application/rpki-publication":{"source":"iana"},"application/rpki-roa":{"source":"iana","extensions":["roa"]},"application/rpki-updown":{"source":"iana"},"application/rsd+xml":{"source":"apache","compressible":true,"extensions":["rsd"]},"application/rss+xml":{"source":"apache","compressible":true,"extensions":["rss"]},"application/rtf":{"source":"iana","compressible":true,"extensions":["rtf"]},"application/rtploopback":{"source":"iana"},"application/rtx":{"source":"iana"},"application/samlassertion+xml":{"source":"iana","compressible":true},"application/samlmetadata+xml":{"source":"iana","compressible":true},"application/sbml+xml":{"source":"iana","compressible":true,"extensions":["sbml"]},"application/scaip+xml":{"source":"iana","compressible":true},"application/scim+json":{"source":"iana","compressible":true},"application/scvp-cv-request":{"source":"iana","extensions":["scq"]},"application/scvp-cv-response":{"source":"iana","extensions":["scs"]},"application/scvp-vp-request":{"source":"iana","extensions":["spq"]},"application/scvp-vp-response":{"source":"iana","extensions":["spp"]},"application/sdp":{"source":"iana","extensions":["sdp"]},"application/secevent+jwt":{"source":"iana"},"application/senml+cbor":{"source":"iana"},"application/senml+json":{"source":"iana","compressible":true},"application/senml+xml":{"source":"iana","compressible":true},"application/senml-exi":{"source":"iana"},"application/sensml+cbor":{"source":"iana"},"application/sensml+json":{"source":"iana","compressible":true},"application/sensml+xml":{"source":"iana","compressible":true},"application/sensml-exi":{"source":"iana"},"application/sep+xml":{"source":"iana","compressible":true},"application/sep-exi":{"source":"iana"},"application/session-info":{"source":"iana"},"application/set-payment":{"source":"iana"},"application/set-payment-initiation":{"source":"iana","extensions":["setpay"]},"application/set-registration":{"source":"iana"},"application/set-registration-initiation":{"source":"iana","extensions":["setreg"]},"application/sgml":{"source":"iana"},"application/sgml-open-catalog":{"source":"iana"},"application/shf+xml":{"source":"iana","compressible":true,"extensions":["shf"]},"application/sieve":{"source":"iana","extensions":["siv","sieve"]},"application/simple-filter+xml":{"source":"iana","compressible":true},"application/simple-message-summary":{"source":"iana"},"application/simplesymbolcontainer":{"source":"iana"},"application/sipc":{"source":"iana"},"application/slate":{"source":"iana"},"application/smil":{"source":"iana"},"application/smil+xml":{"source":"iana","compressible":true,"extensions":["smi","smil"]},"application/smpte336m":{"source":"iana"},"application/soap+fastinfoset":{"source":"iana"},"application/soap+xml":{"source":"iana","compressible":true},"application/sparql-query":{"source":"iana","extensions":["rq"]},"application/sparql-results+xml":{"source":"iana","compressible":true,"extensions":["srx"]},"application/spirits-event+xml":{"source":"iana","compressible":true},"application/sql":{"source":"iana"},"application/srgs":{"source":"iana","extensions":["gram"]},"application/srgs+xml":{"source":"iana","compressible":true,"extensions":["grxml"]},"application/sru+xml":{"source":"iana","compressible":true,"extensions":["sru"]},"application/ssdl+xml":{"source":"apache","compressible":true,"extensions":["ssdl"]},"application/ssml+xml":{"source":"iana","compressible":true,"extensions":["ssml"]},"application/stix+json":{"source":"iana","compressible":true},"application/swid+xml":{"source":"iana","compressible":true},"application/tamp-apex-update":{"source":"iana"},"application/tamp-apex-update-confirm":{"source":"iana"},"application/tamp-community-update":{"source":"iana"},"application/tamp-community-update-confirm":{"source":"iana"},"application/tamp-error":{"source":"iana"},"application/tamp-sequence-adjust":{"source":"iana"},"application/tamp-sequence-adjust-confirm":{"source":"iana"},"application/tamp-status-query":{"source":"iana"},"application/tamp-status-response":{"source":"iana"},"application/tamp-update":{"source":"iana"},"application/tamp-update-confirm":{"source":"iana"},"application/tar":{"compressible":true},"application/taxii+json":{"source":"iana","compressible":true},"application/tei+xml":{"source":"iana","compressible":true,"extensions":["tei","teicorpus"]},"application/tetra_isi":{"source":"iana"},"application/thraud+xml":{"source":"iana","compressible":true,"extensions":["tfi"]},"application/timestamp-query":{"source":"iana"},"application/timestamp-reply":{"source":"iana"},"application/timestamped-data":{"source":"iana","extensions":["tsd"]},"application/tlsrpt+gzip":{"source":"iana"},"application/tlsrpt+json":{"source":"iana","compressible":true},"application/tnauthlist":{"source":"iana"},"application/toml":{"compressible":true,"extensions":["toml"]},"application/trickle-ice-sdpfrag":{"source":"iana"},"application/trig":{"source":"iana"},"application/ttml+xml":{"source":"iana","compressible":true},"application/tve-trigger":{"source":"iana"},"application/tzif":{"source":"iana"},"application/tzif-leap":{"source":"iana"},"application/ulpfec":{"source":"iana"},"application/urc-grpsheet+xml":{"source":"iana","compressible":true},"application/urc-ressheet+xml":{"source":"iana","compressible":true},"application/urc-targetdesc+xml":{"source":"iana","compressible":true},"application/urc-uisocketdesc+xml":{"source":"iana","compressible":true},"application/vcard+json":{"source":"iana","compressible":true},"application/vcard+xml":{"source":"iana","compressible":true},"application/vemmi":{"source":"iana"},"application/vividence.scriptfile":{"source":"apache"},"application/vnd.1000minds.decision-model+xml":{"source":"iana","compressible":true},"application/vnd.3gpp-prose+xml":{"source":"iana","compressible":true},"application/vnd.3gpp-prose-pc3ch+xml":{"source":"iana","compressible":true},"application/vnd.3gpp-v2x-local-service-information":{"source":"iana"},"application/vnd.3gpp.access-transfer-events+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.bsf+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.gmop+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mc-signalling-ear":{"source":"iana"},"application/vnd.3gpp.mcdata-affiliation-command+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-payload":{"source":"iana"},"application/vnd.3gpp.mcdata-service-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-signalling":{"source":"iana"},"application/vnd.3gpp.mcdata-ue-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-user-profile+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-affiliation-command+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-floor-request+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-location-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-mbms-usage-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-service-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-signed+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-ue-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-ue-init-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-user-profile+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-affiliation-command+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-affiliation-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-location-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-mbms-usage-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-service-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-transmission-request+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-ue-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-user-profile+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mid-call+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.pic-bw-large":{"source":"iana","extensions":["plb"]},"application/vnd.3gpp.pic-bw-small":{"source":"iana","extensions":["psb"]},"application/vnd.3gpp.pic-bw-var":{"source":"iana","extensions":["pvb"]},"application/vnd.3gpp.sms":{"source":"iana"},"application/vnd.3gpp.sms+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.srvcc-ext+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.srvcc-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.state-and-event-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.ussd+xml":{"source":"iana","compressible":true},"application/vnd.3gpp2.bcmcsinfo+xml":{"source":"iana","compressible":true},"application/vnd.3gpp2.sms":{"source":"iana"},"application/vnd.3gpp2.tcap":{"source":"iana","extensions":["tcap"]},"application/vnd.3lightssoftware.imagescal":{"source":"iana"},"application/vnd.3m.post-it-notes":{"source":"iana","extensions":["pwn"]},"application/vnd.accpac.simply.aso":{"source":"iana","extensions":["aso"]},"application/vnd.accpac.simply.imp":{"source":"iana","extensions":["imp"]},"application/vnd.acucobol":{"source":"iana","extensions":["acu"]},"application/vnd.acucorp":{"source":"iana","extensions":["atc","acutc"]},"application/vnd.adobe.air-application-installer-package+zip":{"source":"apache","compressible":false,"extensions":["air"]},"application/vnd.adobe.flash.movie":{"source":"iana"},"application/vnd.adobe.formscentral.fcdt":{"source":"iana","extensions":["fcdt"]},"application/vnd.adobe.fxp":{"source":"iana","extensions":["fxp","fxpl"]},"application/vnd.adobe.partial-upload":{"source":"iana"},"application/vnd.adobe.xdp+xml":{"source":"iana","compressible":true,"extensions":["xdp"]},"application/vnd.adobe.xfdf":{"source":"iana","extensions":["xfdf"]},"application/vnd.aether.imp":{"source":"iana"},"application/vnd.afpc.afplinedata":{"source":"iana"},"application/vnd.afpc.modca":{"source":"iana"},"application/vnd.ah-barcode":{"source":"iana"},"application/vnd.ahead.space":{"source":"iana","extensions":["ahead"]},"application/vnd.airzip.filesecure.azf":{"source":"iana","extensions":["azf"]},"application/vnd.airzip.filesecure.azs":{"source":"iana","extensions":["azs"]},"application/vnd.amadeus+json":{"source":"iana","compressible":true},"application/vnd.amazon.ebook":{"source":"apache","extensions":["azw"]},"application/vnd.amazon.mobi8-ebook":{"source":"iana"},"application/vnd.americandynamics.acc":{"source":"iana","extensions":["acc"]},"application/vnd.amiga.ami":{"source":"iana","extensions":["ami"]},"application/vnd.amundsen.maze+xml":{"source":"iana","compressible":true},"application/vnd.android.ota":{"source":"iana"},"application/vnd.android.package-archive":{"source":"apache","compressible":false,"extensions":["apk"]},"application/vnd.anki":{"source":"iana"},"application/vnd.anser-web-certificate-issue-initiation":{"source":"iana","extensions":["cii"]},"application/vnd.anser-web-funds-transfer-initiation":{"source":"apache","extensions":["fti"]},"application/vnd.antix.game-component":{"source":"iana","extensions":["atx"]},"application/vnd.apache.thrift.binary":{"source":"iana"},"application/vnd.apache.thrift.compact":{"source":"iana"},"application/vnd.apache.thrift.json":{"source":"iana"},"application/vnd.api+json":{"source":"iana","compressible":true},"application/vnd.apothekende.reservation+json":{"source":"iana","compressible":true},"application/vnd.apple.installer+xml":{"source":"iana","compressible":true,"extensions":["mpkg"]},"application/vnd.apple.keynote":{"source":"iana","extensions":["keynote"]},"application/vnd.apple.mpegurl":{"source":"iana","extensions":["m3u8"]},"application/vnd.apple.numbers":{"source":"iana","extensions":["numbers"]},"application/vnd.apple.pages":{"source":"iana","extensions":["pages"]},"application/vnd.apple.pkpass":{"compressible":false,"extensions":["pkpass"]},"application/vnd.arastra.swi":{"source":"iana"},"application/vnd.aristanetworks.swi":{"source":"iana","extensions":["swi"]},"application/vnd.artisan+json":{"source":"iana","compressible":true},"application/vnd.artsquare":{"source":"iana"},"application/vnd.astraea-software.iota":{"source":"iana","extensions":["iota"]},"application/vnd.audiograph":{"source":"iana","extensions":["aep"]},"application/vnd.autopackage":{"source":"iana"},"application/vnd.avalon+json":{"source":"iana","compressible":true},"application/vnd.avistar+xml":{"source":"iana","compressible":true},"application/vnd.balsamiq.bmml+xml":{"source":"iana","compressible":true},"application/vnd.balsamiq.bmpr":{"source":"iana"},"application/vnd.banana-accounting":{"source":"iana"},"application/vnd.bbf.usp.error":{"source":"iana"},"application/vnd.bbf.usp.msg":{"source":"iana"},"application/vnd.bbf.usp.msg+json":{"source":"iana","compressible":true},"application/vnd.bekitzur-stech+json":{"source":"iana","compressible":true},"application/vnd.bint.med-content":{"source":"iana"},"application/vnd.biopax.rdf+xml":{"source":"iana","compressible":true},"application/vnd.blink-idb-value-wrapper":{"source":"iana"},"application/vnd.blueice.multipass":{"source":"iana","extensions":["mpm"]},"application/vnd.bluetooth.ep.oob":{"source":"iana"},"application/vnd.bluetooth.le.oob":{"source":"iana"},"application/vnd.bmi":{"source":"iana","extensions":["bmi"]},"application/vnd.bpf":{"source":"iana"},"application/vnd.bpf3":{"source":"iana"},"application/vnd.businessobjects":{"source":"iana","extensions":["rep"]},"application/vnd.byu.uapi+json":{"source":"iana","compressible":true},"application/vnd.cab-jscript":{"source":"iana"},"application/vnd.canon-cpdl":{"source":"iana"},"application/vnd.canon-lips":{"source":"iana"},"application/vnd.capasystems-pg+json":{"source":"iana","compressible":true},"application/vnd.cendio.thinlinc.clientconf":{"source":"iana"},"application/vnd.century-systems.tcp_stream":{"source":"iana"},"application/vnd.chemdraw+xml":{"source":"iana","compressible":true,"extensions":["cdxml"]},"application/vnd.chess-pgn":{"source":"iana"},"application/vnd.chipnuts.karaoke-mmd":{"source":"iana","extensions":["mmd"]},"application/vnd.ciedi":{"source":"iana"},"application/vnd.cinderella":{"source":"iana","extensions":["cdy"]},"application/vnd.cirpack.isdn-ext":{"source":"iana"},"application/vnd.citationstyles.style+xml":{"source":"iana","compressible":true,"extensions":["csl"]},"application/vnd.claymore":{"source":"iana","extensions":["cla"]},"application/vnd.cloanto.rp9":{"source":"iana","extensions":["rp9"]},"application/vnd.clonk.c4group":{"source":"iana","extensions":["c4g","c4d","c4f","c4p","c4u"]},"application/vnd.cluetrust.cartomobile-config":{"source":"iana","extensions":["c11amc"]},"application/vnd.cluetrust.cartomobile-config-pkg":{"source":"iana","extensions":["c11amz"]},"application/vnd.coffeescript":{"source":"iana"},"application/vnd.collabio.xodocuments.document":{"source":"iana"},"application/vnd.collabio.xodocuments.document-template":{"source":"iana"},"application/vnd.collabio.xodocuments.presentation":{"source":"iana"},"application/vnd.collabio.xodocuments.presentation-template":{"source":"iana"},"application/vnd.collabio.xodocuments.spreadsheet":{"source":"iana"},"application/vnd.collabio.xodocuments.spreadsheet-template":{"source":"iana"},"application/vnd.collection+json":{"source":"iana","compressible":true},"application/vnd.collection.doc+json":{"source":"iana","compressible":true},"application/vnd.collection.next+json":{"source":"iana","compressible":true},"application/vnd.comicbook+zip":{"source":"iana","compressible":false},"application/vnd.comicbook-rar":{"source":"iana"},"application/vnd.commerce-battelle":{"source":"iana"},"application/vnd.commonspace":{"source":"iana","extensions":["csp"]},"application/vnd.contact.cmsg":{"source":"iana","extensions":["cdbcmsg"]},"application/vnd.coreos.ignition+json":{"source":"iana","compressible":true},"application/vnd.cosmocaller":{"source":"iana","extensions":["cmc"]},"application/vnd.crick.clicker":{"source":"iana","extensions":["clkx"]},"application/vnd.crick.clicker.keyboard":{"source":"iana","extensions":["clkk"]},"application/vnd.crick.clicker.palette":{"source":"iana","extensions":["clkp"]},"application/vnd.crick.clicker.template":{"source":"iana","extensions":["clkt"]},"application/vnd.crick.clicker.wordbank":{"source":"iana","extensions":["clkw"]},"application/vnd.criticaltools.wbs+xml":{"source":"iana","compressible":true,"extensions":["wbs"]},"application/vnd.cryptii.pipe+json":{"source":"iana","compressible":true},"application/vnd.crypto-shade-file":{"source":"iana"},"application/vnd.ctc-posml":{"source":"iana","extensions":["pml"]},"application/vnd.ctct.ws+xml":{"source":"iana","compressible":true},"application/vnd.cups-pdf":{"source":"iana"},"application/vnd.cups-postscript":{"source":"iana"},"application/vnd.cups-ppd":{"source":"iana","extensions":["ppd"]},"application/vnd.cups-raster":{"source":"iana"},"application/vnd.cups-raw":{"source":"iana"},"application/vnd.curl":{"source":"iana"},"application/vnd.curl.car":{"source":"apache","extensions":["car"]},"application/vnd.curl.pcurl":{"source":"apache","extensions":["pcurl"]},"application/vnd.cyan.dean.root+xml":{"source":"iana","compressible":true},"application/vnd.cybank":{"source":"iana"},"application/vnd.d2l.coursepackage1p0+zip":{"source":"iana","compressible":false},"application/vnd.dart":{"source":"iana","compressible":true,"extensions":["dart"]},"application/vnd.data-vision.rdz":{"source":"iana","extensions":["rdz"]},"application/vnd.datapackage+json":{"source":"iana","compressible":true},"application/vnd.dataresource+json":{"source":"iana","compressible":true},"application/vnd.debian.binary-package":{"source":"iana"},"application/vnd.dece.data":{"source":"iana","extensions":["uvf","uvvf","uvd","uvvd"]},"application/vnd.dece.ttml+xml":{"source":"iana","compressible":true,"extensions":["uvt","uvvt"]},"application/vnd.dece.unspecified":{"source":"iana","extensions":["uvx","uvvx"]},"application/vnd.dece.zip":{"source":"iana","extensions":["uvz","uvvz"]},"application/vnd.denovo.fcselayout-link":{"source":"iana","extensions":["fe_launch"]},"application/vnd.desmume.movie":{"source":"iana"},"application/vnd.dir-bi.plate-dl-nosuffix":{"source":"iana"},"application/vnd.dm.delegation+xml":{"source":"iana","compressible":true},"application/vnd.dna":{"source":"iana","extensions":["dna"]},"application/vnd.document+json":{"source":"iana","compressible":true},"application/vnd.dolby.mlp":{"source":"apache","extensions":["mlp"]},"application/vnd.dolby.mobile.1":{"source":"iana"},"application/vnd.dolby.mobile.2":{"source":"iana"},"application/vnd.doremir.scorecloud-binary-document":{"source":"iana"},"application/vnd.dpgraph":{"source":"iana","extensions":["dpg"]},"application/vnd.dreamfactory":{"source":"iana","extensions":["dfac"]},"application/vnd.drive+json":{"source":"iana","compressible":true},"application/vnd.ds-keypoint":{"source":"apache","extensions":["kpxx"]},"application/vnd.dtg.local":{"source":"iana"},"application/vnd.dtg.local.flash":{"source":"iana"},"application/vnd.dtg.local.html":{"source":"iana"},"application/vnd.dvb.ait":{"source":"iana","extensions":["ait"]},"application/vnd.dvb.dvbj":{"source":"iana"},"application/vnd.dvb.esgcontainer":{"source":"iana"},"application/vnd.dvb.ipdcdftnotifaccess":{"source":"iana"},"application/vnd.dvb.ipdcesgaccess":{"source":"iana"},"application/vnd.dvb.ipdcesgaccess2":{"source":"iana"},"application/vnd.dvb.ipdcesgpdd":{"source":"iana"},"application/vnd.dvb.ipdcroaming":{"source":"iana"},"application/vnd.dvb.iptv.alfec-base":{"source":"iana"},"application/vnd.dvb.iptv.alfec-enhancement":{"source":"iana"},"application/vnd.dvb.notif-aggregate-root+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-container+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-generic+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-ia-msglist+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-ia-registration-request+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-ia-registration-response+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-init+xml":{"source":"iana","compressible":true},"application/vnd.dvb.pfr":{"source":"iana"},"application/vnd.dvb.service":{"source":"iana","extensions":["svc"]},"application/vnd.dxr":{"source":"iana"},"application/vnd.dynageo":{"source":"iana","extensions":["geo"]},"application/vnd.dzr":{"source":"iana"},"application/vnd.easykaraoke.cdgdownload":{"source":"iana"},"application/vnd.ecdis-update":{"source":"iana"},"application/vnd.ecip.rlp":{"source":"iana"},"application/vnd.ecowin.chart":{"source":"iana","extensions":["mag"]},"application/vnd.ecowin.filerequest":{"source":"iana"},"application/vnd.ecowin.fileupdate":{"source":"iana"},"application/vnd.ecowin.series":{"source":"iana"},"application/vnd.ecowin.seriesrequest":{"source":"iana"},"application/vnd.ecowin.seriesupdate":{"source":"iana"},"application/vnd.efi.img":{"source":"iana"},"application/vnd.efi.iso":{"source":"iana"},"application/vnd.emclient.accessrequest+xml":{"source":"iana","compressible":true},"application/vnd.enliven":{"source":"iana","extensions":["nml"]},"application/vnd.enphase.envoy":{"source":"iana"},"application/vnd.eprints.data+xml":{"source":"iana","compressible":true},"application/vnd.epson.esf":{"source":"iana","extensions":["esf"]},"application/vnd.epson.msf":{"source":"iana","extensions":["msf"]},"application/vnd.epson.quickanime":{"source":"iana","extensions":["qam"]},"application/vnd.epson.salt":{"source":"iana","extensions":["slt"]},"application/vnd.epson.ssf":{"source":"iana","extensions":["ssf"]},"application/vnd.ericsson.quickcall":{"source":"iana"},"application/vnd.espass-espass+zip":{"source":"iana","compressible":false},"application/vnd.eszigno3+xml":{"source":"iana","compressible":true,"extensions":["es3","et3"]},"application/vnd.etsi.aoc+xml":{"source":"iana","compressible":true},"application/vnd.etsi.asic-e+zip":{"source":"iana","compressible":false},"application/vnd.etsi.asic-s+zip":{"source":"iana","compressible":false},"application/vnd.etsi.cug+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvcommand+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvdiscovery+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvprofile+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsad-bc+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsad-cod+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsad-npvr+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvservice+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsync+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvueprofile+xml":{"source":"iana","compressible":true},"application/vnd.etsi.mcid+xml":{"source":"iana","compressible":true},"application/vnd.etsi.mheg5":{"source":"iana"},"application/vnd.etsi.overload-control-policy-dataset+xml":{"source":"iana","compressible":true},"application/vnd.etsi.pstn+xml":{"source":"iana","compressible":true},"application/vnd.etsi.sci+xml":{"source":"iana","compressible":true},"application/vnd.etsi.simservs+xml":{"source":"iana","compressible":true},"application/vnd.etsi.timestamp-token":{"source":"iana"},"application/vnd.etsi.tsl+xml":{"source":"iana","compressible":true},"application/vnd.etsi.tsl.der":{"source":"iana"},"application/vnd.eudora.data":{"source":"iana"},"application/vnd.evolv.ecig.profile":{"source":"iana"},"application/vnd.evolv.ecig.settings":{"source":"iana"},"application/vnd.evolv.ecig.theme":{"source":"iana"},"application/vnd.exstream-empower+zip":{"source":"iana","compressible":false},"application/vnd.exstream-package":{"source":"iana"},"application/vnd.ezpix-album":{"source":"iana","extensions":["ez2"]},"application/vnd.ezpix-package":{"source":"iana","extensions":["ez3"]},"application/vnd.f-secure.mobile":{"source":"iana"},"application/vnd.fastcopy-disk-image":{"source":"iana"},"application/vnd.fdf":{"source":"iana","extensions":["fdf"]},"application/vnd.fdsn.mseed":{"source":"iana","extensions":["mseed"]},"application/vnd.fdsn.seed":{"source":"iana","extensions":["seed","dataless"]},"application/vnd.ffsns":{"source":"iana"},"application/vnd.ficlab.flb+zip":{"source":"iana","compressible":false},"application/vnd.filmit.zfc":{"source":"iana"},"application/vnd.fints":{"source":"iana"},"application/vnd.firemonkeys.cloudcell":{"source":"iana"},"application/vnd.flographit":{"source":"iana","extensions":["gph"]},"application/vnd.fluxtime.clip":{"source":"iana","extensions":["ftc"]},"application/vnd.font-fontforge-sfd":{"source":"iana"},"application/vnd.framemaker":{"source":"iana","extensions":["fm","frame","maker","book"]},"application/vnd.frogans.fnc":{"source":"iana","extensions":["fnc"]},"application/vnd.frogans.ltf":{"source":"iana","extensions":["ltf"]},"application/vnd.fsc.weblaunch":{"source":"iana","extensions":["fsc"]},"application/vnd.fujitsu.oasys":{"source":"iana","extensions":["oas"]},"application/vnd.fujitsu.oasys2":{"source":"iana","extensions":["oa2"]},"application/vnd.fujitsu.oasys3":{"source":"iana","extensions":["oa3"]},"application/vnd.fujitsu.oasysgp":{"source":"iana","extensions":["fg5"]},"application/vnd.fujitsu.oasysprs":{"source":"iana","extensions":["bh2"]},"application/vnd.fujixerox.art-ex":{"source":"iana"},"application/vnd.fujixerox.art4":{"source":"iana"},"application/vnd.fujixerox.ddd":{"source":"iana","extensions":["ddd"]},"application/vnd.fujixerox.docuworks":{"source":"iana","extensions":["xdw"]},"application/vnd.fujixerox.docuworks.binder":{"source":"iana","extensions":["xbd"]},"application/vnd.fujixerox.docuworks.container":{"source":"iana"},"application/vnd.fujixerox.hbpl":{"source":"iana"},"application/vnd.fut-misnet":{"source":"iana"},"application/vnd.futoin+cbor":{"source":"iana"},"application/vnd.futoin+json":{"source":"iana","compressible":true},"application/vnd.fuzzysheet":{"source":"iana","extensions":["fzs"]},"application/vnd.genomatix.tuxedo":{"source":"iana","extensions":["txd"]},"application/vnd.geo+json":{"source":"iana","compressible":true},"application/vnd.geocube+xml":{"source":"iana","compressible":true},"application/vnd.geogebra.file":{"source":"iana","extensions":["ggb"]},"application/vnd.geogebra.tool":{"source":"iana","extensions":["ggt"]},"application/vnd.geometry-explorer":{"source":"iana","extensions":["gex","gre"]},"application/vnd.geonext":{"source":"iana","extensions":["gxt"]},"application/vnd.geoplan":{"source":"iana","extensions":["g2w"]},"application/vnd.geospace":{"source":"iana","extensions":["g3w"]},"application/vnd.gerber":{"source":"iana"},"application/vnd.globalplatform.card-content-mgt":{"source":"iana"},"application/vnd.globalplatform.card-content-mgt-response":{"source":"iana"},"application/vnd.gmx":{"source":"iana","extensions":["gmx"]},"application/vnd.google-apps.document":{"compressible":false,"extensions":["gdoc"]},"application/vnd.google-apps.presentation":{"compressible":false,"extensions":["gslides"]},"application/vnd.google-apps.spreadsheet":{"compressible":false,"extensions":["gsheet"]},"application/vnd.google-earth.kml+xml":{"source":"iana","compressible":true,"extensions":["kml"]},"application/vnd.google-earth.kmz":{"source":"iana","compressible":false,"extensions":["kmz"]},"application/vnd.gov.sk.e-form+xml":{"source":"iana","compressible":true},"application/vnd.gov.sk.e-form+zip":{"source":"iana","compressible":false},"application/vnd.gov.sk.xmldatacontainer+xml":{"source":"iana","compressible":true},"application/vnd.grafeq":{"source":"iana","extensions":["gqf","gqs"]},"application/vnd.gridmp":{"source":"iana"},"application/vnd.groove-account":{"source":"iana","extensions":["gac"]},"application/vnd.groove-help":{"source":"iana","extensions":["ghf"]},"application/vnd.groove-identity-message":{"source":"iana","extensions":["gim"]},"application/vnd.groove-injector":{"source":"iana","extensions":["grv"]},"application/vnd.groove-tool-message":{"source":"iana","extensions":["gtm"]},"application/vnd.groove-tool-template":{"source":"iana","extensions":["tpl"]},"application/vnd.groove-vcard":{"source":"iana","extensions":["vcg"]},"application/vnd.hal+json":{"source":"iana","compressible":true},"application/vnd.hal+xml":{"source":"iana","compressible":true,"extensions":["hal"]},"application/vnd.handheld-entertainment+xml":{"source":"iana","compressible":true,"extensions":["zmm"]},"application/vnd.hbci":{"source":"iana","extensions":["hbci"]},"application/vnd.hc+json":{"source":"iana","compressible":true},"application/vnd.hcl-bireports":{"source":"iana"},"application/vnd.hdt":{"source":"iana"},"application/vnd.heroku+json":{"source":"iana","compressible":true},"application/vnd.hhe.lesson-player":{"source":"iana","extensions":["les"]},"application/vnd.hp-hpgl":{"source":"iana","extensions":["hpgl"]},"application/vnd.hp-hpid":{"source":"iana","extensions":["hpid"]},"application/vnd.hp-hps":{"source":"iana","extensions":["hps"]},"application/vnd.hp-jlyt":{"source":"iana","extensions":["jlt"]},"application/vnd.hp-pcl":{"source":"iana","extensions":["pcl"]},"application/vnd.hp-pclxl":{"source":"iana","extensions":["pclxl"]},"application/vnd.httphone":{"source":"iana"},"application/vnd.hydrostatix.sof-data":{"source":"iana","extensions":["sfd-hdstx"]},"application/vnd.hyper+json":{"source":"iana","compressible":true},"application/vnd.hyper-item+json":{"source":"iana","compressible":true},"application/vnd.hyperdrive+json":{"source":"iana","compressible":true},"application/vnd.hzn-3d-crossword":{"source":"iana"},"application/vnd.ibm.afplinedata":{"source":"iana"},"application/vnd.ibm.electronic-media":{"source":"iana"},"application/vnd.ibm.minipay":{"source":"iana","extensions":["mpy"]},"application/vnd.ibm.modcap":{"source":"iana","extensions":["afp","listafp","list3820"]},"application/vnd.ibm.rights-management":{"source":"iana","extensions":["irm"]},"application/vnd.ibm.secure-container":{"source":"iana","extensions":["sc"]},"application/vnd.iccprofile":{"source":"iana","extensions":["icc","icm"]},"application/vnd.ieee.1905":{"source":"iana"},"application/vnd.igloader":{"source":"iana","extensions":["igl"]},"application/vnd.imagemeter.folder+zip":{"source":"iana","compressible":false},"application/vnd.imagemeter.image+zip":{"source":"iana","compressible":false},"application/vnd.immervision-ivp":{"source":"iana","extensions":["ivp"]},"application/vnd.immervision-ivu":{"source":"iana","extensions":["ivu"]},"application/vnd.ims.imsccv1p1":{"source":"iana"},"application/vnd.ims.imsccv1p2":{"source":"iana"},"application/vnd.ims.imsccv1p3":{"source":"iana"},"application/vnd.ims.lis.v2.result+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolconsumerprofile+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolproxy+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolproxy.id+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolsettings+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolsettings.simple+json":{"source":"iana","compressible":true},"application/vnd.informedcontrol.rms+xml":{"source":"iana","compressible":true},"application/vnd.informix-visionary":{"source":"iana"},"application/vnd.infotech.project":{"source":"iana"},"application/vnd.infotech.project+xml":{"source":"iana","compressible":true},"application/vnd.innopath.wamp.notification":{"source":"iana"},"application/vnd.insors.igm":{"source":"iana","extensions":["igm"]},"application/vnd.intercon.formnet":{"source":"iana","extensions":["xpw","xpx"]},"application/vnd.intergeo":{"source":"iana","extensions":["i2g"]},"application/vnd.intertrust.digibox":{"source":"iana"},"application/vnd.intertrust.nncp":{"source":"iana"},"application/vnd.intu.qbo":{"source":"iana","extensions":["qbo"]},"application/vnd.intu.qfx":{"source":"iana","extensions":["qfx"]},"application/vnd.iptc.g2.catalogitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.conceptitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.knowledgeitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.newsitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.newsmessage+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.packageitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.planningitem+xml":{"source":"iana","compressible":true},"application/vnd.ipunplugged.rcprofile":{"source":"iana","extensions":["rcprofile"]},"application/vnd.irepository.package+xml":{"source":"iana","compressible":true,"extensions":["irp"]},"application/vnd.is-xpr":{"source":"iana","extensions":["xpr"]},"application/vnd.isac.fcs":{"source":"iana","extensions":["fcs"]},"application/vnd.iso11783-10+zip":{"source":"iana","compressible":false},"application/vnd.jam":{"source":"iana","extensions":["jam"]},"application/vnd.japannet-directory-service":{"source":"iana"},"application/vnd.japannet-jpnstore-wakeup":{"source":"iana"},"application/vnd.japannet-payment-wakeup":{"source":"iana"},"application/vnd.japannet-registration":{"source":"iana"},"application/vnd.japannet-registration-wakeup":{"source":"iana"},"application/vnd.japannet-setstore-wakeup":{"source":"iana"},"application/vnd.japannet-verification":{"source":"iana"},"application/vnd.japannet-verification-wakeup":{"source":"iana"},"application/vnd.jcp.javame.midlet-rms":{"source":"iana","extensions":["rms"]},"application/vnd.jisp":{"source":"iana","extensions":["jisp"]},"application/vnd.joost.joda-archive":{"source":"iana","extensions":["joda"]},"application/vnd.jsk.isdn-ngn":{"source":"iana"},"application/vnd.kahootz":{"source":"iana","extensions":["ktz","ktr"]},"application/vnd.kde.karbon":{"source":"iana","extensions":["karbon"]},"application/vnd.kde.kchart":{"source":"iana","extensions":["chrt"]},"application/vnd.kde.kformula":{"source":"iana","extensions":["kfo"]},"application/vnd.kde.kivio":{"source":"iana","extensions":["flw"]},"application/vnd.kde.kontour":{"source":"iana","extensions":["kon"]},"application/vnd.kde.kpresenter":{"source":"iana","extensions":["kpr","kpt"]},"application/vnd.kde.kspread":{"source":"iana","extensions":["ksp"]},"application/vnd.kde.kword":{"source":"iana","extensions":["kwd","kwt"]},"application/vnd.kenameaapp":{"source":"iana","extensions":["htke"]},"application/vnd.kidspiration":{"source":"iana","extensions":["kia"]},"application/vnd.kinar":{"source":"iana","extensions":["kne","knp"]},"application/vnd.koan":{"source":"iana","extensions":["skp","skd","skt","skm"]},"application/vnd.kodak-descriptor":{"source":"iana","extensions":["sse"]},"application/vnd.las":{"source":"iana"},"application/vnd.las.las+json":{"source":"iana","compressible":true},"application/vnd.las.las+xml":{"source":"iana","compressible":true,"extensions":["lasxml"]},"application/vnd.laszip":{"source":"iana"},"application/vnd.leap+json":{"source":"iana","compressible":true},"application/vnd.liberty-request+xml":{"source":"iana","compressible":true},"application/vnd.llamagraphics.life-balance.desktop":{"source":"iana","extensions":["lbd"]},"application/vnd.llamagraphics.life-balance.exchange+xml":{"source":"iana","compressible":true,"extensions":["lbe"]},"application/vnd.logipipe.circuit+zip":{"source":"iana","compressible":false},"application/vnd.loom":{"source":"iana"},"application/vnd.lotus-1-2-3":{"source":"iana","extensions":["123"]},"application/vnd.lotus-approach":{"source":"iana","extensions":["apr"]},"application/vnd.lotus-freelance":{"source":"iana","extensions":["pre"]},"application/vnd.lotus-notes":{"source":"iana","extensions":["nsf"]},"application/vnd.lotus-organizer":{"source":"iana","extensions":["org"]},"application/vnd.lotus-screencam":{"source":"iana","extensions":["scm"]},"application/vnd.lotus-wordpro":{"source":"iana","extensions":["lwp"]},"application/vnd.macports.portpkg":{"source":"iana","extensions":["portpkg"]},"application/vnd.mapbox-vector-tile":{"source":"iana"},"application/vnd.marlin.drm.actiontoken+xml":{"source":"iana","compressible":true},"application/vnd.marlin.drm.conftoken+xml":{"source":"iana","compressible":true},"application/vnd.marlin.drm.license+xml":{"source":"iana","compressible":true},"application/vnd.marlin.drm.mdcf":{"source":"iana"},"application/vnd.mason+json":{"source":"iana","compressible":true},"application/vnd.maxmind.maxmind-db":{"source":"iana"},"application/vnd.mcd":{"source":"iana","extensions":["mcd"]},"application/vnd.medcalcdata":{"source":"iana","extensions":["mc1"]},"application/vnd.mediastation.cdkey":{"source":"iana","extensions":["cdkey"]},"application/vnd.meridian-slingshot":{"source":"iana"},"application/vnd.mfer":{"source":"iana","extensions":["mwf"]},"application/vnd.mfmp":{"source":"iana","extensions":["mfm"]},"application/vnd.micro+json":{"source":"iana","compressible":true},"application/vnd.micrografx.flo":{"source":"iana","extensions":["flo"]},"application/vnd.micrografx.igx":{"source":"iana","extensions":["igx"]},"application/vnd.microsoft.portable-executable":{"source":"iana"},"application/vnd.microsoft.windows.thumbnail-cache":{"source":"iana"},"application/vnd.miele+json":{"source":"iana","compressible":true},"application/vnd.mif":{"source":"iana","extensions":["mif"]},"application/vnd.minisoft-hp3000-save":{"source":"iana"},"application/vnd.mitsubishi.misty-guard.trustweb":{"source":"iana"},"application/vnd.mobius.daf":{"source":"iana","extensions":["daf"]},"application/vnd.mobius.dis":{"source":"iana","extensions":["dis"]},"application/vnd.mobius.mbk":{"source":"iana","extensions":["mbk"]},"application/vnd.mobius.mqy":{"source":"iana","extensions":["mqy"]},"application/vnd.mobius.msl":{"source":"iana","extensions":["msl"]},"application/vnd.mobius.plc":{"source":"iana","extensions":["plc"]},"application/vnd.mobius.txf":{"source":"iana","extensions":["txf"]},"application/vnd.mophun.application":{"source":"iana","extensions":["mpn"]},"application/vnd.mophun.certificate":{"source":"iana","extensions":["mpc"]},"application/vnd.motorola.flexsuite":{"source":"iana"},"application/vnd.motorola.flexsuite.adsi":{"source":"iana"},"application/vnd.motorola.flexsuite.fis":{"source":"iana"},"application/vnd.motorola.flexsuite.gotap":{"source":"iana"},"application/vnd.motorola.flexsuite.kmr":{"source":"iana"},"application/vnd.motorola.flexsuite.ttc":{"source":"iana"},"application/vnd.motorola.flexsuite.wem":{"source":"iana"},"application/vnd.motorola.iprm":{"source":"iana"},"application/vnd.mozilla.xul+xml":{"source":"iana","compressible":true,"extensions":["xul"]},"application/vnd.ms-3mfdocument":{"source":"iana"},"application/vnd.ms-artgalry":{"source":"iana","extensions":["cil"]},"application/vnd.ms-asf":{"source":"iana"},"application/vnd.ms-cab-compressed":{"source":"iana","extensions":["cab"]},"application/vnd.ms-color.iccprofile":{"source":"apache"},"application/vnd.ms-excel":{"source":"iana","compressible":false,"extensions":["xls","xlm","xla","xlc","xlt","xlw"]},"application/vnd.ms-excel.addin.macroenabled.12":{"source":"iana","extensions":["xlam"]},"application/vnd.ms-excel.sheet.binary.macroenabled.12":{"source":"iana","extensions":["xlsb"]},"application/vnd.ms-excel.sheet.macroenabled.12":{"source":"iana","extensions":["xlsm"]},"application/vnd.ms-excel.template.macroenabled.12":{"source":"iana","extensions":["xltm"]},"application/vnd.ms-fontobject":{"source":"iana","compressible":true,"extensions":["eot"]},"application/vnd.ms-htmlhelp":{"source":"iana","extensions":["chm"]},"application/vnd.ms-ims":{"source":"iana","extensions":["ims"]},"application/vnd.ms-lrm":{"source":"iana","extensions":["lrm"]},"application/vnd.ms-office.activex+xml":{"source":"iana","compressible":true},"application/vnd.ms-officetheme":{"source":"iana","extensions":["thmx"]},"application/vnd.ms-opentype":{"source":"apache","compressible":true},"application/vnd.ms-outlook":{"compressible":false,"extensions":["msg"]},"application/vnd.ms-package.obfuscated-opentype":{"source":"apache"},"application/vnd.ms-pki.seccat":{"source":"apache","extensions":["cat"]},"application/vnd.ms-pki.stl":{"source":"apache","extensions":["stl"]},"application/vnd.ms-playready.initiator+xml":{"source":"iana","compressible":true},"application/vnd.ms-powerpoint":{"source":"iana","compressible":false,"extensions":["ppt","pps","pot"]},"application/vnd.ms-powerpoint.addin.macroenabled.12":{"source":"iana","extensions":["ppam"]},"application/vnd.ms-powerpoint.presentation.macroenabled.12":{"source":"iana","extensions":["pptm"]},"application/vnd.ms-powerpoint.slide.macroenabled.12":{"source":"iana","extensions":["sldm"]},"application/vnd.ms-powerpoint.slideshow.macroenabled.12":{"source":"iana","extensions":["ppsm"]},"application/vnd.ms-powerpoint.template.macroenabled.12":{"source":"iana","extensions":["potm"]},"application/vnd.ms-printdevicecapabilities+xml":{"source":"iana","compressible":true},"application/vnd.ms-printing.printticket+xml":{"source":"apache","compressible":true},"application/vnd.ms-printschematicket+xml":{"source":"iana","compressible":true},"application/vnd.ms-project":{"source":"iana","extensions":["mpp","mpt"]},"application/vnd.ms-tnef":{"source":"iana"},"application/vnd.ms-windows.devicepairing":{"source":"iana"},"application/vnd.ms-windows.nwprinting.oob":{"source":"iana"},"application/vnd.ms-windows.printerpairing":{"source":"iana"},"application/vnd.ms-windows.wsd.oob":{"source":"iana"},"application/vnd.ms-wmdrm.lic-chlg-req":{"source":"iana"},"application/vnd.ms-wmdrm.lic-resp":{"source":"iana"},"application/vnd.ms-wmdrm.meter-chlg-req":{"source":"iana"},"application/vnd.ms-wmdrm.meter-resp":{"source":"iana"},"application/vnd.ms-word.document.macroenabled.12":{"source":"iana","extensions":["docm"]},"application/vnd.ms-word.template.macroenabled.12":{"source":"iana","extensions":["dotm"]},"application/vnd.ms-works":{"source":"iana","extensions":["wps","wks","wcm","wdb"]},"application/vnd.ms-wpl":{"source":"iana","extensions":["wpl"]},"application/vnd.ms-xpsdocument":{"source":"iana","compressible":false,"extensions":["xps"]},"application/vnd.msa-disk-image":{"source":"iana"},"application/vnd.mseq":{"source":"iana","extensions":["mseq"]},"application/vnd.msign":{"source":"iana"},"application/vnd.multiad.creator":{"source":"iana"},"application/vnd.multiad.creator.cif":{"source":"iana"},"application/vnd.music-niff":{"source":"iana"},"application/vnd.musician":{"source":"iana","extensions":["mus"]},"application/vnd.muvee.style":{"source":"iana","extensions":["msty"]},"application/vnd.mynfc":{"source":"iana","extensions":["taglet"]},"application/vnd.ncd.control":{"source":"iana"},"application/vnd.ncd.reference":{"source":"iana"},"application/vnd.nearst.inv+json":{"source":"iana","compressible":true},"application/vnd.nervana":{"source":"iana"},"application/vnd.netfpx":{"source":"iana"},"application/vnd.neurolanguage.nlu":{"source":"iana","extensions":["nlu"]},"application/vnd.nimn":{"source":"iana"},"application/vnd.nintendo.nitro.rom":{"source":"iana"},"application/vnd.nintendo.snes.rom":{"source":"iana"},"application/vnd.nitf":{"source":"iana","extensions":["ntf","nitf"]},"application/vnd.noblenet-directory":{"source":"iana","extensions":["nnd"]},"application/vnd.noblenet-sealer":{"source":"iana","extensions":["nns"]},"application/vnd.noblenet-web":{"source":"iana","extensions":["nnw"]},"application/vnd.nokia.catalogs":{"source":"iana"},"application/vnd.nokia.conml+wbxml":{"source":"iana"},"application/vnd.nokia.conml+xml":{"source":"iana","compressible":true},"application/vnd.nokia.iptv.config+xml":{"source":"iana","compressible":true},"application/vnd.nokia.isds-radio-presets":{"source":"iana"},"application/vnd.nokia.landmark+wbxml":{"source":"iana"},"application/vnd.nokia.landmark+xml":{"source":"iana","compressible":true},"application/vnd.nokia.landmarkcollection+xml":{"source":"iana","compressible":true},"application/vnd.nokia.n-gage.ac+xml":{"source":"iana","compressible":true},"application/vnd.nokia.n-gage.data":{"source":"iana","extensions":["ngdat"]},"application/vnd.nokia.n-gage.symbian.install":{"source":"iana","extensions":["n-gage"]},"application/vnd.nokia.ncd":{"source":"iana"},"application/vnd.nokia.pcd+wbxml":{"source":"iana"},"application/vnd.nokia.pcd+xml":{"source":"iana","compressible":true},"application/vnd.nokia.radio-preset":{"source":"iana","extensions":["rpst"]},"application/vnd.nokia.radio-presets":{"source":"iana","extensions":["rpss"]},"application/vnd.novadigm.edm":{"source":"iana","extensions":["edm"]},"application/vnd.novadigm.edx":{"source":"iana","extensions":["edx"]},"application/vnd.novadigm.ext":{"source":"iana","extensions":["ext"]},"application/vnd.ntt-local.content-share":{"source":"iana"},"application/vnd.ntt-local.file-transfer":{"source":"iana"},"application/vnd.ntt-local.ogw_remote-access":{"source":"iana"},"application/vnd.ntt-local.sip-ta_remote":{"source":"iana"},"application/vnd.ntt-local.sip-ta_tcp_stream":{"source":"iana"},"application/vnd.oasis.opendocument.chart":{"source":"iana","extensions":["odc"]},"application/vnd.oasis.opendocument.chart-template":{"source":"iana","extensions":["otc"]},"application/vnd.oasis.opendocument.database":{"source":"iana","extensions":["odb"]},"application/vnd.oasis.opendocument.formula":{"source":"iana","extensions":["odf"]},"application/vnd.oasis.opendocument.formula-template":{"source":"iana","extensions":["odft"]},"application/vnd.oasis.opendocument.graphics":{"source":"iana","compressible":false,"extensions":["odg"]},"application/vnd.oasis.opendocument.graphics-template":{"source":"iana","extensions":["otg"]},"application/vnd.oasis.opendocument.image":{"source":"iana","extensions":["odi"]},"application/vnd.oasis.opendocument.image-template":{"source":"iana","extensions":["oti"]},"application/vnd.oasis.opendocument.presentation":{"source":"iana","compressible":false,"extensions":["odp"]},"application/vnd.oasis.opendocument.presentation-template":{"source":"iana","extensions":["otp"]},"application/vnd.oasis.opendocument.spreadsheet":{"source":"iana","compressible":false,"extensions":["ods"]},"application/vnd.oasis.opendocument.spreadsheet-template":{"source":"iana","extensions":["ots"]},"application/vnd.oasis.opendocument.text":{"source":"iana","compressible":false,"extensions":["odt"]},"application/vnd.oasis.opendocument.text-master":{"source":"iana","extensions":["odm"]},"application/vnd.oasis.opendocument.text-template":{"source":"iana","extensions":["ott"]},"application/vnd.oasis.opendocument.text-web":{"source":"iana","extensions":["oth"]},"application/vnd.obn":{"source":"iana"},"application/vnd.ocf+cbor":{"source":"iana"},"application/vnd.oftn.l10n+json":{"source":"iana","compressible":true},"application/vnd.oipf.contentaccessdownload+xml":{"source":"iana","compressible":true},"application/vnd.oipf.contentaccessstreaming+xml":{"source":"iana","compressible":true},"application/vnd.oipf.cspg-hexbinary":{"source":"iana"},"application/vnd.oipf.dae.svg+xml":{"source":"iana","compressible":true},"application/vnd.oipf.dae.xhtml+xml":{"source":"iana","compressible":true},"application/vnd.oipf.mippvcontrolmessage+xml":{"source":"iana","compressible":true},"application/vnd.oipf.pae.gem":{"source":"iana"},"application/vnd.oipf.spdiscovery+xml":{"source":"iana","compressible":true},"application/vnd.oipf.spdlist+xml":{"source":"iana","compressible":true},"application/vnd.oipf.ueprofile+xml":{"source":"iana","compressible":true},"application/vnd.oipf.userprofile+xml":{"source":"iana","compressible":true},"application/vnd.olpc-sugar":{"source":"iana","extensions":["xo"]},"application/vnd.oma-scws-config":{"source":"iana"},"application/vnd.oma-scws-http-request":{"source":"iana"},"application/vnd.oma-scws-http-response":{"source":"iana"},"application/vnd.oma.bcast.associated-procedure-parameter+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.drm-trigger+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.imd+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.ltkm":{"source":"iana"},"application/vnd.oma.bcast.notification+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.provisioningtrigger":{"source":"iana"},"application/vnd.oma.bcast.sgboot":{"source":"iana"},"application/vnd.oma.bcast.sgdd+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.sgdu":{"source":"iana"},"application/vnd.oma.bcast.simple-symbol-container":{"source":"iana"},"application/vnd.oma.bcast.smartcard-trigger+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.sprov+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.stkm":{"source":"iana"},"application/vnd.oma.cab-address-book+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-feature-handler+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-pcc+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-subs-invite+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-user-prefs+xml":{"source":"iana","compressible":true},"application/vnd.oma.dcd":{"source":"iana"},"application/vnd.oma.dcdc":{"source":"iana"},"application/vnd.oma.dd2+xml":{"source":"iana","compressible":true,"extensions":["dd2"]},"application/vnd.oma.drm.risd+xml":{"source":"iana","compressible":true},"application/vnd.oma.group-usage-list+xml":{"source":"iana","compressible":true},"application/vnd.oma.lwm2m+json":{"source":"iana","compressible":true},"application/vnd.oma.lwm2m+tlv":{"source":"iana"},"application/vnd.oma.pal+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.detailed-progress-report+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.final-report+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.groups+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.invocation-descriptor+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.optimized-progress-report+xml":{"source":"iana","compressible":true},"application/vnd.oma.push":{"source":"iana"},"application/vnd.oma.scidm.messages+xml":{"source":"iana","compressible":true},"application/vnd.oma.xcap-directory+xml":{"source":"iana","compressible":true},"application/vnd.omads-email+xml":{"source":"iana","compressible":true},"application/vnd.omads-file+xml":{"source":"iana","compressible":true},"application/vnd.omads-folder+xml":{"source":"iana","compressible":true},"application/vnd.omaloc-supl-init":{"source":"iana"},"application/vnd.onepager":{"source":"iana"},"application/vnd.onepagertamp":{"source":"iana"},"application/vnd.onepagertamx":{"source":"iana"},"application/vnd.onepagertat":{"source":"iana"},"application/vnd.onepagertatp":{"source":"iana"},"application/vnd.onepagertatx":{"source":"iana"},"application/vnd.openblox.game+xml":{"source":"iana","compressible":true},"application/vnd.openblox.game-binary":{"source":"iana"},"application/vnd.openeye.oeb":{"source":"iana"},"application/vnd.openofficeorg.extension":{"source":"apache","extensions":["oxt"]},"application/vnd.openstreetmap.data+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.custom-properties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.customxmlproperties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawing+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.chart+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.extended-properties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.comments+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.presentation":{"source":"iana","compressible":false,"extensions":["pptx"]},"application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.presprops+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slide":{"source":"iana","extensions":["sldx"]},"application/vnd.openxmlformats-officedocument.presentationml.slide+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slideshow":{"source":"iana","extensions":["ppsx"]},"application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.tags+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.template":{"source":"iana","extensions":["potx"]},"application/vnd.openxmlformats-officedocument.presentationml.template.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":{"source":"iana","compressible":false,"extensions":["xlsx"]},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.template":{"source":"iana","extensions":["xltx"]},"application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.theme+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.themeoverride+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.vmldrawing":{"source":"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.document":{"source":"iana","compressible":false,"extensions":["docx"]},"application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.template":{"source":"iana","extensions":["dotx"]},"application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-package.core-properties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-package.relationships+xml":{"source":"iana","compressible":true},"application/vnd.oracle.resource+json":{"source":"iana","compressible":true},"application/vnd.orange.indata":{"source":"iana"},"application/vnd.osa.netdeploy":{"source":"iana"},"application/vnd.osgeo.mapguide.package":{"source":"iana","extensions":["mgp"]},"application/vnd.osgi.bundle":{"source":"iana"},"application/vnd.osgi.dp":{"source":"iana","extensions":["dp"]},"application/vnd.osgi.subsystem":{"source":"iana","extensions":["esa"]},"application/vnd.otps.ct-kip+xml":{"source":"iana","compressible":true},"application/vnd.oxli.countgraph":{"source":"iana"},"application/vnd.pagerduty+json":{"source":"iana","compressible":true},"application/vnd.palm":{"source":"iana","extensions":["pdb","pqa","oprc"]},"application/vnd.panoply":{"source":"iana"},"application/vnd.paos.xml":{"source":"iana"},"application/vnd.patentdive":{"source":"iana"},"application/vnd.patientecommsdoc":{"source":"iana"},"application/vnd.pawaafile":{"source":"iana","extensions":["paw"]},"application/vnd.pcos":{"source":"iana"},"application/vnd.pg.format":{"source":"iana","extensions":["str"]},"application/vnd.pg.osasli":{"source":"iana","extensions":["ei6"]},"application/vnd.piaccess.application-licence":{"source":"iana"},"application/vnd.picsel":{"source":"iana","extensions":["efif"]},"application/vnd.pmi.widget":{"source":"iana","extensions":["wg"]},"application/vnd.poc.group-advertisement+xml":{"source":"iana","compressible":true},"application/vnd.pocketlearn":{"source":"iana","extensions":["plf"]},"application/vnd.powerbuilder6":{"source":"iana","extensions":["pbd"]},"application/vnd.powerbuilder6-s":{"source":"iana"},"application/vnd.powerbuilder7":{"source":"iana"},"application/vnd.powerbuilder7-s":{"source":"iana"},"application/vnd.powerbuilder75":{"source":"iana"},"application/vnd.powerbuilder75-s":{"source":"iana"},"application/vnd.preminet":{"source":"iana"},"application/vnd.previewsystems.box":{"source":"iana","extensions":["box"]},"application/vnd.proteus.magazine":{"source":"iana","extensions":["mgz"]},"application/vnd.psfs":{"source":"iana"},"application/vnd.publishare-delta-tree":{"source":"iana","extensions":["qps"]},"application/vnd.pvi.ptid1":{"source":"iana","extensions":["ptid"]},"application/vnd.pwg-multiplexed":{"source":"iana"},"application/vnd.pwg-xhtml-print+xml":{"source":"iana","compressible":true},"application/vnd.qualcomm.brew-app-res":{"source":"iana"},"application/vnd.quarantainenet":{"source":"iana"},"application/vnd.quark.quarkxpress":{"source":"iana","extensions":["qxd","qxt","qwd","qwt","qxl","qxb"]},"application/vnd.quobject-quoxdocument":{"source":"iana"},"application/vnd.radisys.moml+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-conf+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-conn+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-dialog+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-stream+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-conf+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-base+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-fax-detect+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-fax-sendrecv+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-group+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-speech+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-transform+xml":{"source":"iana","compressible":true},"application/vnd.rainstor.data":{"source":"iana"},"application/vnd.rapid":{"source":"iana"},"application/vnd.rar":{"source":"iana"},"application/vnd.realvnc.bed":{"source":"iana","extensions":["bed"]},"application/vnd.recordare.musicxml":{"source":"iana","extensions":["mxl"]},"application/vnd.recordare.musicxml+xml":{"source":"iana","compressible":true,"extensions":["musicxml"]},"application/vnd.renlearn.rlprint":{"source":"iana"},"application/vnd.restful+json":{"source":"iana","compressible":true},"application/vnd.rig.cryptonote":{"source":"iana","extensions":["cryptonote"]},"application/vnd.rim.cod":{"source":"apache","extensions":["cod"]},"application/vnd.rn-realmedia":{"source":"apache","extensions":["rm"]},"application/vnd.rn-realmedia-vbr":{"source":"apache","extensions":["rmvb"]},"application/vnd.route66.link66+xml":{"source":"iana","compressible":true,"extensions":["link66"]},"application/vnd.rs-274x":{"source":"iana"},"application/vnd.ruckus.download":{"source":"iana"},"application/vnd.s3sms":{"source":"iana"},"application/vnd.sailingtracker.track":{"source":"iana","extensions":["st"]},"application/vnd.sbm.cid":{"source":"iana"},"application/vnd.sbm.mid2":{"source":"iana"},"application/vnd.scribus":{"source":"iana"},"application/vnd.sealed.3df":{"source":"iana"},"application/vnd.sealed.csf":{"source":"iana"},"application/vnd.sealed.doc":{"source":"iana"},"application/vnd.sealed.eml":{"source":"iana"},"application/vnd.sealed.mht":{"source":"iana"},"application/vnd.sealed.net":{"source":"iana"},"application/vnd.sealed.ppt":{"source":"iana"},"application/vnd.sealed.tiff":{"source":"iana"},"application/vnd.sealed.xls":{"source":"iana"},"application/vnd.sealedmedia.softseal.html":{"source":"iana"},"application/vnd.sealedmedia.softseal.pdf":{"source":"iana"},"application/vnd.seemail":{"source":"iana","extensions":["see"]},"application/vnd.sema":{"source":"iana","extensions":["sema"]},"application/vnd.semd":{"source":"iana","extensions":["semd"]},"application/vnd.semf":{"source":"iana","extensions":["semf"]},"application/vnd.shade-save-file":{"source":"iana"},"application/vnd.shana.informed.formdata":{"source":"iana","extensions":["ifm"]},"application/vnd.shana.informed.formtemplate":{"source":"iana","extensions":["itp"]},"application/vnd.shana.informed.interchange":{"source":"iana","extensions":["iif"]},"application/vnd.shana.informed.package":{"source":"iana","extensions":["ipk"]},"application/vnd.shootproof+json":{"source":"iana","compressible":true},"application/vnd.shopkick+json":{"source":"iana","compressible":true},"application/vnd.sigrok.session":{"source":"iana"},"application/vnd.simtech-mindmapper":{"source":"iana","extensions":["twd","twds"]},"application/vnd.siren+json":{"source":"iana","compressible":true},"application/vnd.smaf":{"source":"iana","extensions":["mmf"]},"application/vnd.smart.notebook":{"source":"iana"},"application/vnd.smart.teacher":{"source":"iana","extensions":["teacher"]},"application/vnd.software602.filler.form+xml":{"source":"iana","compressible":true},"application/vnd.software602.filler.form-xml-zip":{"source":"iana"},"application/vnd.solent.sdkm+xml":{"source":"iana","compressible":true,"extensions":["sdkm","sdkd"]},"application/vnd.spotfire.dxp":{"source":"iana","extensions":["dxp"]},"application/vnd.spotfire.sfs":{"source":"iana","extensions":["sfs"]},"application/vnd.sqlite3":{"source":"iana"},"application/vnd.sss-cod":{"source":"iana"},"application/vnd.sss-dtf":{"source":"iana"},"application/vnd.sss-ntf":{"source":"iana"},"application/vnd.stardivision.calc":{"source":"apache","extensions":["sdc"]},"application/vnd.stardivision.draw":{"source":"apache","extensions":["sda"]},"application/vnd.stardivision.impress":{"source":"apache","extensions":["sdd"]},"application/vnd.stardivision.math":{"source":"apache","extensions":["smf"]},"application/vnd.stardivision.writer":{"source":"apache","extensions":["sdw","vor"]},"application/vnd.stardivision.writer-global":{"source":"apache","extensions":["sgl"]},"application/vnd.stepmania.package":{"source":"iana","extensions":["smzip"]},"application/vnd.stepmania.stepchart":{"source":"iana","extensions":["sm"]},"application/vnd.street-stream":{"source":"iana"},"application/vnd.sun.wadl+xml":{"source":"iana","compressible":true,"extensions":["wadl"]},"application/vnd.sun.xml.calc":{"source":"apache","extensions":["sxc"]},"application/vnd.sun.xml.calc.template":{"source":"apache","extensions":["stc"]},"application/vnd.sun.xml.draw":{"source":"apache","extensions":["sxd"]},"application/vnd.sun.xml.draw.template":{"source":"apache","extensions":["std"]},"application/vnd.sun.xml.impress":{"source":"apache","extensions":["sxi"]},"application/vnd.sun.xml.impress.template":{"source":"apache","extensions":["sti"]},"application/vnd.sun.xml.math":{"source":"apache","extensions":["sxm"]},"application/vnd.sun.xml.writer":{"source":"apache","extensions":["sxw"]},"application/vnd.sun.xml.writer.global":{"source":"apache","extensions":["sxg"]},"application/vnd.sun.xml.writer.template":{"source":"apache","extensions":["stw"]},"application/vnd.sus-calendar":{"source":"iana","extensions":["sus","susp"]},"application/vnd.svd":{"source":"iana","extensions":["svd"]},"application/vnd.swiftview-ics":{"source":"iana"},"application/vnd.symbian.install":{"source":"apache","extensions":["sis","sisx"]},"application/vnd.syncml+xml":{"source":"iana","compressible":true,"extensions":["xsm"]},"application/vnd.syncml.dm+wbxml":{"source":"iana","extensions":["bdm"]},"application/vnd.syncml.dm+xml":{"source":"iana","compressible":true,"extensions":["xdm"]},"application/vnd.syncml.dm.notification":{"source":"iana"},"application/vnd.syncml.dmddf+wbxml":{"source":"iana"},"application/vnd.syncml.dmddf+xml":{"source":"iana","compressible":true},"application/vnd.syncml.dmtnds+wbxml":{"source":"iana"},"application/vnd.syncml.dmtnds+xml":{"source":"iana","compressible":true},"application/vnd.syncml.ds.notification":{"source":"iana"},"application/vnd.tableschema+json":{"source":"iana","compressible":true},"application/vnd.tao.intent-module-archive":{"source":"iana","extensions":["tao"]},"application/vnd.tcpdump.pcap":{"source":"iana","extensions":["pcap","cap","dmp"]},"application/vnd.think-cell.ppttc+json":{"source":"iana","compressible":true},"application/vnd.tmd.mediaflex.api+xml":{"source":"iana","compressible":true},"application/vnd.tml":{"source":"iana"},"application/vnd.tmobile-livetv":{"source":"iana","extensions":["tmo"]},"application/vnd.tri.onesource":{"source":"iana"},"application/vnd.trid.tpt":{"source":"iana","extensions":["tpt"]},"application/vnd.triscape.mxs":{"source":"iana","extensions":["mxs"]},"application/vnd.trueapp":{"source":"iana","extensions":["tra"]},"application/vnd.truedoc":{"source":"iana"},"application/vnd.ubisoft.webplayer":{"source":"iana"},"application/vnd.ufdl":{"source":"iana","extensions":["ufd","ufdl"]},"application/vnd.uiq.theme":{"source":"iana","extensions":["utz"]},"application/vnd.umajin":{"source":"iana","extensions":["umj"]},"application/vnd.unity":{"source":"iana","extensions":["unityweb"]},"application/vnd.uoml+xml":{"source":"iana","compressible":true,"extensions":["uoml"]},"application/vnd.uplanet.alert":{"source":"iana"},"application/vnd.uplanet.alert-wbxml":{"source":"iana"},"application/vnd.uplanet.bearer-choice":{"source":"iana"},"application/vnd.uplanet.bearer-choice-wbxml":{"source":"iana"},"application/vnd.uplanet.cacheop":{"source":"iana"},"application/vnd.uplanet.cacheop-wbxml":{"source":"iana"},"application/vnd.uplanet.channel":{"source":"iana"},"application/vnd.uplanet.channel-wbxml":{"source":"iana"},"application/vnd.uplanet.list":{"source":"iana"},"application/vnd.uplanet.list-wbxml":{"source":"iana"},"application/vnd.uplanet.listcmd":{"source":"iana"},"application/vnd.uplanet.listcmd-wbxml":{"source":"iana"},"application/vnd.uplanet.signal":{"source":"iana"},"application/vnd.uri-map":{"source":"iana"},"application/vnd.valve.source.material":{"source":"iana"},"application/vnd.vcx":{"source":"iana","extensions":["vcx"]},"application/vnd.vd-study":{"source":"iana"},"application/vnd.vectorworks":{"source":"iana"},"application/vnd.vel+json":{"source":"iana","compressible":true},"application/vnd.verimatrix.vcas":{"source":"iana"},"application/vnd.veryant.thin":{"source":"iana"},"application/vnd.ves.encrypted":{"source":"iana"},"application/vnd.vidsoft.vidconference":{"source":"iana"},"application/vnd.visio":{"source":"iana","extensions":["vsd","vst","vss","vsw"]},"application/vnd.visionary":{"source":"iana","extensions":["vis"]},"application/vnd.vividence.scriptfile":{"source":"iana"},"application/vnd.vsf":{"source":"iana","extensions":["vsf"]},"application/vnd.wap.sic":{"source":"iana"},"application/vnd.wap.slc":{"source":"iana"},"application/vnd.wap.wbxml":{"source":"iana","extensions":["wbxml"]},"application/vnd.wap.wmlc":{"source":"iana","extensions":["wmlc"]},"application/vnd.wap.wmlscriptc":{"source":"iana","extensions":["wmlsc"]},"application/vnd.webturbo":{"source":"iana","extensions":["wtb"]},"application/vnd.wfa.p2p":{"source":"iana"},"application/vnd.wfa.wsc":{"source":"iana"},"application/vnd.windows.devicepairing":{"source":"iana"},"application/vnd.wmc":{"source":"iana"},"application/vnd.wmf.bootstrap":{"source":"iana"},"application/vnd.wolfram.mathematica":{"source":"iana"},"application/vnd.wolfram.mathematica.package":{"source":"iana"},"application/vnd.wolfram.player":{"source":"iana","extensions":["nbp"]},"application/vnd.wordperfect":{"source":"iana","extensions":["wpd"]},"application/vnd.wqd":{"source":"iana","extensions":["wqd"]},"application/vnd.wrq-hp3000-labelled":{"source":"iana"},"application/vnd.wt.stf":{"source":"iana","extensions":["stf"]},"application/vnd.wv.csp+wbxml":{"source":"iana"},"application/vnd.wv.csp+xml":{"source":"iana","compressible":true},"application/vnd.wv.ssp+xml":{"source":"iana","compressible":true},"application/vnd.xacml+json":{"source":"iana","compressible":true},"application/vnd.xara":{"source":"iana","extensions":["xar"]},"application/vnd.xfdl":{"source":"iana","extensions":["xfdl"]},"application/vnd.xfdl.webform":{"source":"iana"},"application/vnd.xmi+xml":{"source":"iana","compressible":true},"application/vnd.xmpie.cpkg":{"source":"iana"},"application/vnd.xmpie.dpkg":{"source":"iana"},"application/vnd.xmpie.plan":{"source":"iana"},"application/vnd.xmpie.ppkg":{"source":"iana"},"application/vnd.xmpie.xlim":{"source":"iana"},"application/vnd.yamaha.hv-dic":{"source":"iana","extensions":["hvd"]},"application/vnd.yamaha.hv-script":{"source":"iana","extensions":["hvs"]},"application/vnd.yamaha.hv-voice":{"source":"iana","extensions":["hvp"]},"application/vnd.yamaha.openscoreformat":{"source":"iana","extensions":["osf"]},"application/vnd.yamaha.openscoreformat.osfpvg+xml":{"source":"iana","compressible":true,"extensions":["osfpvg"]},"application/vnd.yamaha.remote-setup":{"source":"iana"},"application/vnd.yamaha.smaf-audio":{"source":"iana","extensions":["saf"]},"application/vnd.yamaha.smaf-phrase":{"source":"iana","extensions":["spf"]},"application/vnd.yamaha.through-ngn":{"source":"iana"},"application/vnd.yamaha.tunnel-udpencap":{"source":"iana"},"application/vnd.yaoweme":{"source":"iana"},"application/vnd.yellowriver-custom-menu":{"source":"iana","extensions":["cmp"]},"application/vnd.youtube.yt":{"source":"iana"},"application/vnd.zul":{"source":"iana","extensions":["zir","zirz"]},"application/vnd.zzazz.deck+xml":{"source":"iana","compressible":true,"extensions":["zaz"]},"application/voicexml+xml":{"source":"iana","compressible":true,"extensions":["vxml"]},"application/voucher-cms+json":{"source":"iana","compressible":true},"application/vq-rtcpxr":{"source":"iana"},"application/wasm":{"compressible":true,"extensions":["wasm"]},"application/watcherinfo+xml":{"source":"iana","compressible":true},"application/webpush-options+json":{"source":"iana","compressible":true},"application/whoispp-query":{"source":"iana"},"application/whoispp-response":{"source":"iana"},"application/widget":{"source":"iana","extensions":["wgt"]},"application/winhlp":{"source":"apache","extensions":["hlp"]},"application/wita":{"source":"iana"},"application/wordperfect5.1":{"source":"iana"},"application/wsdl+xml":{"source":"iana","compressible":true,"extensions":["wsdl"]},"application/wspolicy+xml":{"source":"iana","compressible":true,"extensions":["wspolicy"]},"application/x-7z-compressed":{"source":"apache","compressible":false,"extensions":["7z"]},"application/x-abiword":{"source":"apache","extensions":["abw"]},"application/x-ace-compressed":{"source":"apache","extensions":["ace"]},"application/x-amf":{"source":"apache"},"application/x-apple-diskimage":{"source":"apache","extensions":["dmg"]},"application/x-arj":{"compressible":false,"extensions":["arj"]},"application/x-authorware-bin":{"source":"apache","extensions":["aab","x32","u32","vox"]},"application/x-authorware-map":{"source":"apache","extensions":["aam"]},"application/x-authorware-seg":{"source":"apache","extensions":["aas"]},"application/x-bcpio":{"source":"apache","extensions":["bcpio"]},"application/x-bdoc":{"compressible":false,"extensions":["bdoc"]},"application/x-bittorrent":{"source":"apache","extensions":["torrent"]},"application/x-blorb":{"source":"apache","extensions":["blb","blorb"]},"application/x-bzip":{"source":"apache","compressible":false,"extensions":["bz"]},"application/x-bzip2":{"source":"apache","compressible":false,"extensions":["bz2","boz"]},"application/x-cbr":{"source":"apache","extensions":["cbr","cba","cbt","cbz","cb7"]},"application/x-cdlink":{"source":"apache","extensions":["vcd"]},"application/x-cfs-compressed":{"source":"apache","extensions":["cfs"]},"application/x-chat":{"source":"apache","extensions":["chat"]},"application/x-chess-pgn":{"source":"apache","extensions":["pgn"]},"application/x-chrome-extension":{"extensions":["crx"]},"application/x-cocoa":{"source":"nginx","extensions":["cco"]},"application/x-compress":{"source":"apache"},"application/x-conference":{"source":"apache","extensions":["nsc"]},"application/x-cpio":{"source":"apache","extensions":["cpio"]},"application/x-csh":{"source":"apache","extensions":["csh"]},"application/x-deb":{"compressible":false},"application/x-debian-package":{"source":"apache","extensions":["deb","udeb"]},"application/x-dgc-compressed":{"source":"apache","extensions":["dgc"]},"application/x-director":{"source":"apache","extensions":["dir","dcr","dxr","cst","cct","cxt","w3d","fgd","swa"]},"application/x-doom":{"source":"apache","extensions":["wad"]},"application/x-dtbncx+xml":{"source":"apache","compressible":true,"extensions":["ncx"]},"application/x-dtbook+xml":{"source":"apache","compressible":true,"extensions":["dtb"]},"application/x-dtbresource+xml":{"source":"apache","compressible":true,"extensions":["res"]},"application/x-dvi":{"source":"apache","compressible":false,"extensions":["dvi"]},"application/x-envoy":{"source":"apache","extensions":["evy"]},"application/x-eva":{"source":"apache","extensions":["eva"]},"application/x-font-bdf":{"source":"apache","extensions":["bdf"]},"application/x-font-dos":{"source":"apache"},"application/x-font-framemaker":{"source":"apache"},"application/x-font-ghostscript":{"source":"apache","extensions":["gsf"]},"application/x-font-libgrx":{"source":"apache"},"application/x-font-linux-psf":{"source":"apache","extensions":["psf"]},"application/x-font-pcf":{"source":"apache","extensions":["pcf"]},"application/x-font-snf":{"source":"apache","extensions":["snf"]},"application/x-font-speedo":{"source":"apache"},"application/x-font-sunos-news":{"source":"apache"},"application/x-font-type1":{"source":"apache","extensions":["pfa","pfb","pfm","afm"]},"application/x-font-vfont":{"source":"apache"},"application/x-freearc":{"source":"apache","extensions":["arc"]},"application/x-futuresplash":{"source":"apache","extensions":["spl"]},"application/x-gca-compressed":{"source":"apache","extensions":["gca"]},"application/x-glulx":{"source":"apache","extensions":["ulx"]},"application/x-gnumeric":{"source":"apache","extensions":["gnumeric"]},"application/x-gramps-xml":{"source":"apache","extensions":["gramps"]},"application/x-gtar":{"source":"apache","extensions":["gtar"]},"application/x-gzip":{"source":"apache"},"application/x-hdf":{"source":"apache","extensions":["hdf"]},"application/x-httpd-php":{"compressible":true,"extensions":["php"]},"application/x-install-instructions":{"source":"apache","extensions":["install"]},"application/x-iso9660-image":{"source":"apache","extensions":["iso"]},"application/x-java-archive-diff":{"source":"nginx","extensions":["jardiff"]},"application/x-java-jnlp-file":{"source":"apache","compressible":false,"extensions":["jnlp"]},"application/x-javascript":{"compressible":true},"application/x-latex":{"source":"apache","compressible":false,"extensions":["latex"]},"application/x-lua-bytecode":{"extensions":["luac"]},"application/x-lzh-compressed":{"source":"apache","extensions":["lzh","lha"]},"application/x-makeself":{"source":"nginx","extensions":["run"]},"application/x-mie":{"source":"apache","extensions":["mie"]},"application/x-mobipocket-ebook":{"source":"apache","extensions":["prc","mobi"]},"application/x-mpegurl":{"compressible":false},"application/x-ms-application":{"source":"apache","extensions":["application"]},"application/x-ms-shortcut":{"source":"apache","extensions":["lnk"]},"application/x-ms-wmd":{"source":"apache","extensions":["wmd"]},"application/x-ms-wmz":{"source":"apache","extensions":["wmz"]},"application/x-ms-xbap":{"source":"apache","extensions":["xbap"]},"application/x-msaccess":{"source":"apache","extensions":["mdb"]},"application/x-msbinder":{"source":"apache","extensions":["obd"]},"application/x-mscardfile":{"source":"apache","extensions":["crd"]},"application/x-msclip":{"source":"apache","extensions":["clp"]},"application/x-msdos-program":{"extensions":["exe"]},"application/x-msdownload":{"source":"apache","extensions":["exe","dll","com","bat","msi"]},"application/x-msmediaview":{"source":"apache","extensions":["mvb","m13","m14"]},"application/x-msmetafile":{"source":"apache","extensions":["wmf","wmz","emf","emz"]},"application/x-msmoney":{"source":"apache","extensions":["mny"]},"application/x-mspublisher":{"source":"apache","extensions":["pub"]},"application/x-msschedule":{"source":"apache","extensions":["scd"]},"application/x-msterminal":{"source":"apache","extensions":["trm"]},"application/x-mswrite":{"source":"apache","extensions":["wri"]},"application/x-netcdf":{"source":"apache","extensions":["nc","cdf"]},"application/x-ns-proxy-autoconfig":{"compressible":true,"extensions":["pac"]},"application/x-nzb":{"source":"apache","extensions":["nzb"]},"application/x-perl":{"source":"nginx","extensions":["pl","pm"]},"application/x-pilot":{"source":"nginx","extensions":["prc","pdb"]},"application/x-pkcs12":{"source":"apache","compressible":false,"extensions":["p12","pfx"]},"application/x-pkcs7-certificates":{"source":"apache","extensions":["p7b","spc"]},"application/x-pkcs7-certreqresp":{"source":"apache","extensions":["p7r"]},"application/x-rar-compressed":{"source":"apache","compressible":false,"extensions":["rar"]},"application/x-redhat-package-manager":{"source":"nginx","extensions":["rpm"]},"application/x-research-info-systems":{"source":"apache","extensions":["ris"]},"application/x-sea":{"source":"nginx","extensions":["sea"]},"application/x-sh":{"source":"apache","compressible":true,"extensions":["sh"]},"application/x-shar":{"source":"apache","extensions":["shar"]},"application/x-shockwave-flash":{"source":"apache","compressible":false,"extensions":["swf"]},"application/x-silverlight-app":{"source":"apache","extensions":["xap"]},"application/x-sql":{"source":"apache","extensions":["sql"]},"application/x-stuffit":{"source":"apache","compressible":false,"extensions":["sit"]},"application/x-stuffitx":{"source":"apache","extensions":["sitx"]},"application/x-subrip":{"source":"apache","extensions":["srt"]},"application/x-sv4cpio":{"source":"apache","extensions":["sv4cpio"]},"application/x-sv4crc":{"source":"apache","extensions":["sv4crc"]},"application/x-t3vm-image":{"source":"apache","extensions":["t3"]},"application/x-tads":{"source":"apache","extensions":["gam"]},"application/x-tar":{"source":"apache","compressible":true,"extensions":["tar"]},"application/x-tcl":{"source":"apache","extensions":["tcl","tk"]},"application/x-tex":{"source":"apache","extensions":["tex"]},"application/x-tex-tfm":{"source":"apache","extensions":["tfm"]},"application/x-texinfo":{"source":"apache","extensions":["texinfo","texi"]},"application/x-tgif":{"source":"apache","extensions":["obj"]},"application/x-ustar":{"source":"apache","extensions":["ustar"]},"application/x-virtualbox-hdd":{"compressible":true,"extensions":["hdd"]},"application/x-virtualbox-ova":{"compressible":true,"extensions":["ova"]},"application/x-virtualbox-ovf":{"compressible":true,"extensions":["ovf"]},"application/x-virtualbox-vbox":{"compressible":true,"extensions":["vbox"]},"application/x-virtualbox-vbox-extpack":{"compressible":false,"extensions":["vbox-extpack"]},"application/x-virtualbox-vdi":{"compressible":true,"extensions":["vdi"]},"application/x-virtualbox-vhd":{"compressible":true,"extensions":["vhd"]},"application/x-virtualbox-vmdk":{"compressible":true,"extensions":["vmdk"]},"application/x-wais-source":{"source":"apache","extensions":["src"]},"application/x-web-app-manifest+json":{"compressible":true,"extensions":["webapp"]},"application/x-www-form-urlencoded":{"source":"iana","compressible":true},"application/x-x509-ca-cert":{"source":"apache","extensions":["der","crt","pem"]},"application/x-xfig":{"source":"apache","extensions":["fig"]},"application/x-xliff+xml":{"source":"apache","compressible":true,"extensions":["xlf"]},"application/x-xpinstall":{"source":"apache","compressible":false,"extensions":["xpi"]},"application/x-xz":{"source":"apache","extensions":["xz"]},"application/x-zmachine":{"source":"apache","extensions":["z1","z2","z3","z4","z5","z6","z7","z8"]},"application/x400-bp":{"source":"iana"},"application/xacml+xml":{"source":"iana","compressible":true},"application/xaml+xml":{"source":"apache","compressible":true,"extensions":["xaml"]},"application/xcap-att+xml":{"source":"iana","compressible":true},"application/xcap-caps+xml":{"source":"iana","compressible":true},"application/xcap-diff+xml":{"source":"iana","compressible":true,"extensions":["xdf"]},"application/xcap-el+xml":{"source":"iana","compressible":true},"application/xcap-error+xml":{"source":"iana","compressible":true},"application/xcap-ns+xml":{"source":"iana","compressible":true},"application/xcon-conference-info+xml":{"source":"iana","compressible":true},"application/xcon-conference-info-diff+xml":{"source":"iana","compressible":true},"application/xenc+xml":{"source":"iana","compressible":true,"extensions":["xenc"]},"application/xhtml+xml":{"source":"iana","compressible":true,"extensions":["xhtml","xht"]},"application/xhtml-voice+xml":{"source":"apache","compressible":true},"application/xliff+xml":{"source":"iana","compressible":true},"application/xml":{"source":"iana","compressible":true,"extensions":["xml","xsl","xsd","rng"]},"application/xml-dtd":{"source":"iana","compressible":true,"extensions":["dtd"]},"application/xml-external-parsed-entity":{"source":"iana"},"application/xml-patch+xml":{"source":"iana","compressible":true},"application/xmpp+xml":{"source":"iana","compressible":true},"application/xop+xml":{"source":"iana","compressible":true,"extensions":["xop"]},"application/xproc+xml":{"source":"apache","compressible":true,"extensions":["xpl"]},"application/xslt+xml":{"source":"iana","compressible":true,"extensions":["xslt"]},"application/xspf+xml":{"source":"apache","compressible":true,"extensions":["xspf"]},"application/xv+xml":{"source":"iana","compressible":true,"extensions":["mxml","xhvml","xvml","xvm"]},"application/yang":{"source":"iana","extensions":["yang"]},"application/yang-data+json":{"source":"iana","compressible":true},"application/yang-data+xml":{"source":"iana","compressible":true},"application/yang-patch+json":{"source":"iana","compressible":true},"application/yang-patch+xml":{"source":"iana","compressible":true},"application/yin+xml":{"source":"iana","compressible":true,"extensions":["yin"]},"application/zip":{"source":"iana","compressible":false,"extensions":["zip"]},"application/zlib":{"source":"iana"},"application/zstd":{"source":"iana"},"audio/1d-interleaved-parityfec":{"source":"iana"},"audio/32kadpcm":{"source":"iana"},"audio/3gpp":{"source":"iana","compressible":false,"extensions":["3gpp"]},"audio/3gpp2":{"source":"iana"},"audio/aac":{"source":"iana"},"audio/ac3":{"source":"iana"},"audio/adpcm":{"source":"apache","extensions":["adp"]},"audio/amr":{"source":"iana"},"audio/amr-wb":{"source":"iana"},"audio/amr-wb+":{"source":"iana"},"audio/aptx":{"source":"iana"},"audio/asc":{"source":"iana"},"audio/atrac-advanced-lossless":{"source":"iana"},"audio/atrac-x":{"source":"iana"},"audio/atrac3":{"source":"iana"},"audio/basic":{"source":"iana","compressible":false,"extensions":["au","snd"]},"audio/bv16":{"source":"iana"},"audio/bv32":{"source":"iana"},"audio/clearmode":{"source":"iana"},"audio/cn":{"source":"iana"},"audio/dat12":{"source":"iana"},"audio/dls":{"source":"iana"},"audio/dsr-es201108":{"source":"iana"},"audio/dsr-es202050":{"source":"iana"},"audio/dsr-es202211":{"source":"iana"},"audio/dsr-es202212":{"source":"iana"},"audio/dv":{"source":"iana"},"audio/dvi4":{"source":"iana"},"audio/eac3":{"source":"iana"},"audio/encaprtp":{"source":"iana"},"audio/evrc":{"source":"iana"},"audio/evrc-qcp":{"source":"iana"},"audio/evrc0":{"source":"iana"},"audio/evrc1":{"source":"iana"},"audio/evrcb":{"source":"iana"},"audio/evrcb0":{"source":"iana"},"audio/evrcb1":{"source":"iana"},"audio/evrcnw":{"source":"iana"},"audio/evrcnw0":{"source":"iana"},"audio/evrcnw1":{"source":"iana"},"audio/evrcwb":{"source":"iana"},"audio/evrcwb0":{"source":"iana"},"audio/evrcwb1":{"source":"iana"},"audio/evs":{"source":"iana"},"audio/flexfec":{"source":"iana"},"audio/fwdred":{"source":"iana"},"audio/g711-0":{"source":"iana"},"audio/g719":{"source":"iana"},"audio/g722":{"source":"iana"},"audio/g7221":{"source":"iana"},"audio/g723":{"source":"iana"},"audio/g726-16":{"source":"iana"},"audio/g726-24":{"source":"iana"},"audio/g726-32":{"source":"iana"},"audio/g726-40":{"source":"iana"},"audio/g728":{"source":"iana"},"audio/g729":{"source":"iana"},"audio/g7291":{"source":"iana"},"audio/g729d":{"source":"iana"},"audio/g729e":{"source":"iana"},"audio/gsm":{"source":"iana"},"audio/gsm-efr":{"source":"iana"},"audio/gsm-hr-08":{"source":"iana"},"audio/ilbc":{"source":"iana"},"audio/ip-mr_v2.5":{"source":"iana"},"audio/isac":{"source":"apache"},"audio/l16":{"source":"iana"},"audio/l20":{"source":"iana"},"audio/l24":{"source":"iana","compressible":false},"audio/l8":{"source":"iana"},"audio/lpc":{"source":"iana"},"audio/melp":{"source":"iana"},"audio/melp1200":{"source":"iana"},"audio/melp2400":{"source":"iana"},"audio/melp600":{"source":"iana"},"audio/midi":{"source":"apache","extensions":["mid","midi","kar","rmi"]},"audio/mobile-xmf":{"source":"iana"},"audio/mp3":{"compressible":false,"extensions":["mp3"]},"audio/mp4":{"source":"iana","compressible":false,"extensions":["m4a","mp4a"]},"audio/mp4a-latm":{"source":"iana"},"audio/mpa":{"source":"iana"},"audio/mpa-robust":{"source":"iana"},"audio/mpeg":{"source":"iana","compressible":false,"extensions":["mpga","mp2","mp2a","mp3","m2a","m3a"]},"audio/mpeg4-generic":{"source":"iana"},"audio/musepack":{"source":"apache"},"audio/ogg":{"source":"iana","compressible":false,"extensions":["oga","ogg","spx"]},"audio/opus":{"source":"iana"},"audio/parityfec":{"source":"iana"},"audio/pcma":{"source":"iana"},"audio/pcma-wb":{"source":"iana"},"audio/pcmu":{"source":"iana"},"audio/pcmu-wb":{"source":"iana"},"audio/prs.sid":{"source":"iana"},"audio/qcelp":{"source":"iana"},"audio/raptorfec":{"source":"iana"},"audio/red":{"source":"iana"},"audio/rtp-enc-aescm128":{"source":"iana"},"audio/rtp-midi":{"source":"iana"},"audio/rtploopback":{"source":"iana"},"audio/rtx":{"source":"iana"},"audio/s3m":{"source":"apache","extensions":["s3m"]},"audio/silk":{"source":"apache","extensions":["sil"]},"audio/smv":{"source":"iana"},"audio/smv-qcp":{"source":"iana"},"audio/smv0":{"source":"iana"},"audio/sp-midi":{"source":"iana"},"audio/speex":{"source":"iana"},"audio/t140c":{"source":"iana"},"audio/t38":{"source":"iana"},"audio/telephone-event":{"source":"iana"},"audio/tetra_acelp":{"source":"iana"},"audio/tone":{"source":"iana"},"audio/uemclip":{"source":"iana"},"audio/ulpfec":{"source":"iana"},"audio/usac":{"source":"iana"},"audio/vdvi":{"source":"iana"},"audio/vmr-wb":{"source":"iana"},"audio/vnd.3gpp.iufp":{"source":"iana"},"audio/vnd.4sb":{"source":"iana"},"audio/vnd.audiokoz":{"source":"iana"},"audio/vnd.celp":{"source":"iana"},"audio/vnd.cisco.nse":{"source":"iana"},"audio/vnd.cmles.radio-events":{"source":"iana"},"audio/vnd.cns.anp1":{"source":"iana"},"audio/vnd.cns.inf1":{"source":"iana"},"audio/vnd.dece.audio":{"source":"iana","extensions":["uva","uvva"]},"audio/vnd.digital-winds":{"source":"iana","extensions":["eol"]},"audio/vnd.dlna.adts":{"source":"iana"},"audio/vnd.dolby.heaac.1":{"source":"iana"},"audio/vnd.dolby.heaac.2":{"source":"iana"},"audio/vnd.dolby.mlp":{"source":"iana"},"audio/vnd.dolby.mps":{"source":"iana"},"audio/vnd.dolby.pl2":{"source":"iana"},"audio/vnd.dolby.pl2x":{"source":"iana"},"audio/vnd.dolby.pl2z":{"source":"iana"},"audio/vnd.dolby.pulse.1":{"source":"iana"},"audio/vnd.dra":{"source":"iana","extensions":["dra"]},"audio/vnd.dts":{"source":"iana","extensions":["dts"]},"audio/vnd.dts.hd":{"source":"iana","extensions":["dtshd"]},"audio/vnd.dts.uhd":{"source":"iana"},"audio/vnd.dvb.file":{"source":"iana"},"audio/vnd.everad.plj":{"source":"iana"},"audio/vnd.hns.audio":{"source":"iana"},"audio/vnd.lucent.voice":{"source":"iana","extensions":["lvp"]},"audio/vnd.ms-playready.media.pya":{"source":"iana","extensions":["pya"]},"audio/vnd.nokia.mobile-xmf":{"source":"iana"},"audio/vnd.nortel.vbk":{"source":"iana"},"audio/vnd.nuera.ecelp4800":{"source":"iana","extensions":["ecelp4800"]},"audio/vnd.nuera.ecelp7470":{"source":"iana","extensions":["ecelp7470"]},"audio/vnd.nuera.ecelp9600":{"source":"iana","extensions":["ecelp9600"]},"audio/vnd.octel.sbc":{"source":"iana"},"audio/vnd.presonus.multitrack":{"source":"iana"},"audio/vnd.qcelp":{"source":"iana"},"audio/vnd.rhetorex.32kadpcm":{"source":"iana"},"audio/vnd.rip":{"source":"iana","extensions":["rip"]},"audio/vnd.rn-realaudio":{"compressible":false},"audio/vnd.sealedmedia.softseal.mpeg":{"source":"iana"},"audio/vnd.vmx.cvsd":{"source":"iana"},"audio/vnd.wave":{"compressible":false},"audio/vorbis":{"source":"iana","compressible":false},"audio/vorbis-config":{"source":"iana"},"audio/wav":{"compressible":false,"extensions":["wav"]},"audio/wave":{"compressible":false,"extensions":["wav"]},"audio/webm":{"source":"apache","compressible":false,"extensions":["weba"]},"audio/x-aac":{"source":"apache","compressible":false,"extensions":["aac"]},"audio/x-aiff":{"source":"apache","extensions":["aif","aiff","aifc"]},"audio/x-caf":{"source":"apache","compressible":false,"extensions":["caf"]},"audio/x-flac":{"source":"apache","extensions":["flac"]},"audio/x-m4a":{"source":"nginx","extensions":["m4a"]},"audio/x-matroska":{"source":"apache","extensions":["mka"]},"audio/x-mpegurl":{"source":"apache","extensions":["m3u"]},"audio/x-ms-wax":{"source":"apache","extensions":["wax"]},"audio/x-ms-wma":{"source":"apache","extensions":["wma"]},"audio/x-pn-realaudio":{"source":"apache","extensions":["ram","ra"]},"audio/x-pn-realaudio-plugin":{"source":"apache","extensions":["rmp"]},"audio/x-realaudio":{"source":"nginx","extensions":["ra"]},"audio/x-tta":{"source":"apache"},"audio/x-wav":{"source":"apache","extensions":["wav"]},"audio/xm":{"source":"apache","extensions":["xm"]},"chemical/x-cdx":{"source":"apache","extensions":["cdx"]},"chemical/x-cif":{"source":"apache","extensions":["cif"]},"chemical/x-cmdf":{"source":"apache","extensions":["cmdf"]},"chemical/x-cml":{"source":"apache","extensions":["cml"]},"chemical/x-csml":{"source":"apache","extensions":["csml"]},"chemical/x-pdb":{"source":"apache"},"chemical/x-xyz":{"source":"apache","extensions":["xyz"]},"font/collection":{"source":"iana","extensions":["ttc"]},"font/otf":{"source":"iana","compressible":true,"extensions":["otf"]},"font/sfnt":{"source":"iana"},"font/ttf":{"source":"iana","compressible":true,"extensions":["ttf"]},"font/woff":{"source":"iana","extensions":["woff"]},"font/woff2":{"source":"iana","extensions":["woff2"]},"image/aces":{"source":"iana","extensions":["exr"]},"image/apng":{"compressible":false,"extensions":["apng"]},"image/avci":{"source":"iana"},"image/avcs":{"source":"iana"},"image/bmp":{"source":"iana","compressible":true,"extensions":["bmp"]},"image/cgm":{"source":"iana","extensions":["cgm"]},"image/dicom-rle":{"source":"iana","extensions":["drle"]},"image/emf":{"source":"iana","extensions":["emf"]},"image/fits":{"source":"iana","extensions":["fits"]},"image/g3fax":{"source":"iana","extensions":["g3"]},"image/gif":{"source":"iana","compressible":false,"extensions":["gif"]},"image/heic":{"source":"iana","extensions":["heic"]},"image/heic-sequence":{"source":"iana","extensions":["heics"]},"image/heif":{"source":"iana","extensions":["heif"]},"image/heif-sequence":{"source":"iana","extensions":["heifs"]},"image/hej2k":{"source":"iana","extensions":["hej2"]},"image/hsj2":{"source":"iana","extensions":["hsj2"]},"image/ief":{"source":"iana","extensions":["ief"]},"image/jls":{"source":"iana","extensions":["jls"]},"image/jp2":{"source":"iana","compressible":false,"extensions":["jp2","jpg2"]},"image/jpeg":{"source":"iana","compressible":false,"extensions":["jpeg","jpg","jpe"]},"image/jph":{"source":"iana","extensions":["jph"]},"image/jphc":{"source":"iana","extensions":["jhc"]},"image/jpm":{"source":"iana","compressible":false,"extensions":["jpm"]},"image/jpx":{"source":"iana","compressible":false,"extensions":["jpx","jpf"]},"image/jxr":{"source":"iana","extensions":["jxr"]},"image/jxra":{"source":"iana","extensions":["jxra"]},"image/jxrs":{"source":"iana","extensions":["jxrs"]},"image/jxs":{"source":"iana","extensions":["jxs"]},"image/jxsc":{"source":"iana","extensions":["jxsc"]},"image/jxsi":{"source":"iana","extensions":["jxsi"]},"image/jxss":{"source":"iana","extensions":["jxss"]},"image/ktx":{"source":"iana","extensions":["ktx"]},"image/naplps":{"source":"iana"},"image/pjpeg":{"compressible":false},"image/png":{"source":"iana","compressible":false,"extensions":["png"]},"image/prs.btif":{"source":"iana","extensions":["btif"]},"image/prs.pti":{"source":"iana","extensions":["pti"]},"image/pwg-raster":{"source":"iana"},"image/sgi":{"source":"apache","extensions":["sgi"]},"image/svg+xml":{"source":"iana","compressible":true,"extensions":["svg","svgz"]},"image/t38":{"source":"iana","extensions":["t38"]},"image/tiff":{"source":"iana","compressible":false,"extensions":["tif","tiff"]},"image/tiff-fx":{"source":"iana","extensions":["tfx"]},"image/vnd.adobe.photoshop":{"source":"iana","compressible":true,"extensions":["psd"]},"image/vnd.airzip.accelerator.azv":{"source":"iana","extensions":["azv"]},"image/vnd.cns.inf2":{"source":"iana"},"image/vnd.dece.graphic":{"source":"iana","extensions":["uvi","uvvi","uvg","uvvg"]},"image/vnd.djvu":{"source":"iana","extensions":["djvu","djv"]},"image/vnd.dvb.subtitle":{"source":"iana","extensions":["sub"]},"image/vnd.dwg":{"source":"iana","extensions":["dwg"]},"image/vnd.dxf":{"source":"iana","extensions":["dxf"]},"image/vnd.fastbidsheet":{"source":"iana","extensions":["fbs"]},"image/vnd.fpx":{"source":"iana","extensions":["fpx"]},"image/vnd.fst":{"source":"iana","extensions":["fst"]},"image/vnd.fujixerox.edmics-mmr":{"source":"iana","extensions":["mmr"]},"image/vnd.fujixerox.edmics-rlc":{"source":"iana","extensions":["rlc"]},"image/vnd.globalgraphics.pgb":{"source":"iana"},"image/vnd.microsoft.icon":{"source":"iana","extensions":["ico"]},"image/vnd.mix":{"source":"iana"},"image/vnd.mozilla.apng":{"source":"iana"},"image/vnd.ms-dds":{"extensions":["dds"]},"image/vnd.ms-modi":{"source":"iana","extensions":["mdi"]},"image/vnd.ms-photo":{"source":"apache","extensions":["wdp"]},"image/vnd.net-fpx":{"source":"iana","extensions":["npx"]},"image/vnd.radiance":{"source":"iana"},"image/vnd.sealed.png":{"source":"iana"},"image/vnd.sealedmedia.softseal.gif":{"source":"iana"},"image/vnd.sealedmedia.softseal.jpg":{"source":"iana"},"image/vnd.svf":{"source":"iana"},"image/vnd.tencent.tap":{"source":"iana","extensions":["tap"]},"image/vnd.valve.source.texture":{"source":"iana","extensions":["vtf"]},"image/vnd.wap.wbmp":{"source":"iana","extensions":["wbmp"]},"image/vnd.xiff":{"source":"iana","extensions":["xif"]},"image/vnd.zbrush.pcx":{"source":"iana","extensions":["pcx"]},"image/webp":{"source":"apache","extensions":["webp"]},"image/wmf":{"source":"iana","extensions":["wmf"]},"image/x-3ds":{"source":"apache","extensions":["3ds"]},"image/x-cmu-raster":{"source":"apache","extensions":["ras"]},"image/x-cmx":{"source":"apache","extensions":["cmx"]},"image/x-freehand":{"source":"apache","extensions":["fh","fhc","fh4","fh5","fh7"]},"image/x-icon":{"source":"apache","compressible":true,"extensions":["ico"]},"image/x-jng":{"source":"nginx","extensions":["jng"]},"image/x-mrsid-image":{"source":"apache","extensions":["sid"]},"image/x-ms-bmp":{"source":"nginx","compressible":true,"extensions":["bmp"]},"image/x-pcx":{"source":"apache","extensions":["pcx"]},"image/x-pict":{"source":"apache","extensions":["pic","pct"]},"image/x-portable-anymap":{"source":"apache","extensions":["pnm"]},"image/x-portable-bitmap":{"source":"apache","extensions":["pbm"]},"image/x-portable-graymap":{"source":"apache","extensions":["pgm"]},"image/x-portable-pixmap":{"source":"apache","extensions":["ppm"]},"image/x-rgb":{"source":"apache","extensions":["rgb"]},"image/x-tga":{"source":"apache","extensions":["tga"]},"image/x-xbitmap":{"source":"apache","extensions":["xbm"]},"image/x-xcf":{"compressible":false},"image/x-xpixmap":{"source":"apache","extensions":["xpm"]},"image/x-xwindowdump":{"source":"apache","extensions":["xwd"]},"message/cpim":{"source":"iana"},"message/delivery-status":{"source":"iana"},"message/disposition-notification":{"source":"iana","extensions":["disposition-notification"]},"message/external-body":{"source":"iana"},"message/feedback-report":{"source":"iana"},"message/global":{"source":"iana","extensions":["u8msg"]},"message/global-delivery-status":{"source":"iana","extensions":["u8dsn"]},"message/global-disposition-notification":{"source":"iana","extensions":["u8mdn"]},"message/global-headers":{"source":"iana","extensions":["u8hdr"]},"message/http":{"source":"iana","compressible":false},"message/imdn+xml":{"source":"iana","compressible":true},"message/news":{"source":"iana"},"message/partial":{"source":"iana","compressible":false},"message/rfc822":{"source":"iana","compressible":true,"extensions":["eml","mime"]},"message/s-http":{"source":"iana"},"message/sip":{"source":"iana"},"message/sipfrag":{"source":"iana"},"message/tracking-status":{"source":"iana"},"message/vnd.si.simp":{"source":"iana"},"message/vnd.wfa.wsc":{"source":"iana","extensions":["wsc"]},"model/3mf":{"source":"iana","extensions":["3mf"]},"model/gltf+json":{"source":"iana","compressible":true,"extensions":["gltf"]},"model/gltf-binary":{"source":"iana","compressible":true,"extensions":["glb"]},"model/iges":{"source":"iana","compressible":false,"extensions":["igs","iges"]},"model/mesh":{"source":"iana","compressible":false,"extensions":["msh","mesh","silo"]},"model/stl":{"source":"iana","extensions":["stl"]},"model/vnd.collada+xml":{"source":"iana","compressible":true,"extensions":["dae"]},"model/vnd.dwf":{"source":"iana","extensions":["dwf"]},"model/vnd.flatland.3dml":{"source":"iana"},"model/vnd.gdl":{"source":"iana","extensions":["gdl"]},"model/vnd.gs-gdl":{"source":"apache"},"model/vnd.gs.gdl":{"source":"iana"},"model/vnd.gtw":{"source":"iana","extensions":["gtw"]},"model/vnd.moml+xml":{"source":"iana","compressible":true},"model/vnd.mts":{"source":"iana","extensions":["mts"]},"model/vnd.opengex":{"source":"iana","extensions":["ogex"]},"model/vnd.parasolid.transmit.binary":{"source":"iana","extensions":["x_b"]},"model/vnd.parasolid.transmit.text":{"source":"iana","extensions":["x_t"]},"model/vnd.rosette.annotated-data-model":{"source":"iana"},"model/vnd.usdz+zip":{"source":"iana","compressible":false,"extensions":["usdz"]},"model/vnd.valve.source.compiled-map":{"source":"iana","extensions":["bsp"]},"model/vnd.vtu":{"source":"iana","extensions":["vtu"]},"model/vrml":{"source":"iana","compressible":false,"extensions":["wrl","vrml"]},"model/x3d+binary":{"source":"apache","compressible":false,"extensions":["x3db","x3dbz"]},"model/x3d+fastinfoset":{"source":"iana","extensions":["x3db"]},"model/x3d+vrml":{"source":"apache","compressible":false,"extensions":["x3dv","x3dvz"]},"model/x3d+xml":{"source":"iana","compressible":true,"extensions":["x3d","x3dz"]},"model/x3d-vrml":{"source":"iana","extensions":["x3dv"]},"multipart/alternative":{"source":"iana","compressible":false},"multipart/appledouble":{"source":"iana"},"multipart/byteranges":{"source":"iana"},"multipart/digest":{"source":"iana"},"multipart/encrypted":{"source":"iana","compressible":false},"multipart/form-data":{"source":"iana","compressible":false},"multipart/header-set":{"source":"iana"},"multipart/mixed":{"source":"iana"},"multipart/multilingual":{"source":"iana"},"multipart/parallel":{"source":"iana"},"multipart/related":{"source":"iana","compressible":false},"multipart/report":{"source":"iana"},"multipart/signed":{"source":"iana","compressible":false},"multipart/vnd.bint.med-plus":{"source":"iana"},"multipart/voice-message":{"source":"iana"},"multipart/x-mixed-replace":{"source":"iana"},"text/1d-interleaved-parityfec":{"source":"iana"},"text/cache-manifest":{"source":"iana","compressible":true,"extensions":["appcache","manifest"]},"text/calendar":{"source":"iana","extensions":["ics","ifb"]},"text/calender":{"compressible":true},"text/cmd":{"compressible":true},"text/coffeescript":{"extensions":["coffee","litcoffee"]},"text/css":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["css"]},"text/csv":{"source":"iana","compressible":true,"extensions":["csv"]},"text/csv-schema":{"source":"iana"},"text/directory":{"source":"iana"},"text/dns":{"source":"iana"},"text/ecmascript":{"source":"iana"},"text/encaprtp":{"source":"iana"},"text/enriched":{"source":"iana"},"text/flexfec":{"source":"iana"},"text/fwdred":{"source":"iana"},"text/grammar-ref-list":{"source":"iana"},"text/html":{"source":"iana","compressible":true,"extensions":["html","htm","shtml"]},"text/jade":{"extensions":["jade"]},"text/javascript":{"source":"iana","compressible":true},"text/jcr-cnd":{"source":"iana"},"text/jsx":{"compressible":true,"extensions":["jsx"]},"text/less":{"compressible":true,"extensions":["less"]},"text/markdown":{"source":"iana","compressible":true,"extensions":["markdown","md"]},"text/mathml":{"source":"nginx","extensions":["mml"]},"text/mdx":{"compressible":true,"extensions":["mdx"]},"text/mizar":{"source":"iana"},"text/n3":{"source":"iana","compressible":true,"extensions":["n3"]},"text/parameters":{"source":"iana"},"text/parityfec":{"source":"iana"},"text/plain":{"source":"iana","compressible":true,"extensions":["txt","text","conf","def","list","log","in","ini"]},"text/provenance-notation":{"source":"iana"},"text/prs.fallenstein.rst":{"source":"iana"},"text/prs.lines.tag":{"source":"iana","extensions":["dsc"]},"text/prs.prop.logic":{"source":"iana"},"text/raptorfec":{"source":"iana"},"text/red":{"source":"iana"},"text/rfc822-headers":{"source":"iana"},"text/richtext":{"source":"iana","compressible":true,"extensions":["rtx"]},"text/rtf":{"source":"iana","compressible":true,"extensions":["rtf"]},"text/rtp-enc-aescm128":{"source":"iana"},"text/rtploopback":{"source":"iana"},"text/rtx":{"source":"iana"},"text/sgml":{"source":"iana","extensions":["sgml","sgm"]},"text/shex":{"extensions":["shex"]},"text/slim":{"extensions":["slim","slm"]},"text/strings":{"source":"iana"},"text/stylus":{"extensions":["stylus","styl"]},"text/t140":{"source":"iana"},"text/tab-separated-values":{"source":"iana","compressible":true,"extensions":["tsv"]},"text/troff":{"source":"iana","extensions":["t","tr","roff","man","me","ms"]},"text/turtle":{"source":"iana","charset":"UTF-8","extensions":["ttl"]},"text/ulpfec":{"source":"iana"},"text/uri-list":{"source":"iana","compressible":true,"extensions":["uri","uris","urls"]},"text/vcard":{"source":"iana","compressible":true,"extensions":["vcard"]},"text/vnd.a":{"source":"iana"},"text/vnd.abc":{"source":"iana"},"text/vnd.ascii-art":{"source":"iana"},"text/vnd.curl":{"source":"iana","extensions":["curl"]},"text/vnd.curl.dcurl":{"source":"apache","extensions":["dcurl"]},"text/vnd.curl.mcurl":{"source":"apache","extensions":["mcurl"]},"text/vnd.curl.scurl":{"source":"apache","extensions":["scurl"]},"text/vnd.debian.copyright":{"source":"iana"},"text/vnd.dmclientscript":{"source":"iana"},"text/vnd.dvb.subtitle":{"source":"iana","extensions":["sub"]},"text/vnd.esmertec.theme-descriptor":{"source":"iana"},"text/vnd.ficlab.flt":{"source":"iana"},"text/vnd.fly":{"source":"iana","extensions":["fly"]},"text/vnd.fmi.flexstor":{"source":"iana","extensions":["flx"]},"text/vnd.gml":{"source":"iana"},"text/vnd.graphviz":{"source":"iana","extensions":["gv"]},"text/vnd.hgl":{"source":"iana"},"text/vnd.in3d.3dml":{"source":"iana","extensions":["3dml"]},"text/vnd.in3d.spot":{"source":"iana","extensions":["spot"]},"text/vnd.iptc.newsml":{"source":"iana"},"text/vnd.iptc.nitf":{"source":"iana"},"text/vnd.latex-z":{"source":"iana"},"text/vnd.motorola.reflex":{"source":"iana"},"text/vnd.ms-mediapackage":{"source":"iana"},"text/vnd.net2phone.commcenter.command":{"source":"iana"},"text/vnd.radisys.msml-basic-layout":{"source":"iana"},"text/vnd.senx.warpscript":{"source":"iana"},"text/vnd.si.uricatalogue":{"source":"iana"},"text/vnd.sosi":{"source":"iana"},"text/vnd.sun.j2me.app-descriptor":{"source":"iana","extensions":["jad"]},"text/vnd.trolltech.linguist":{"source":"iana"},"text/vnd.wap.si":{"source":"iana"},"text/vnd.wap.sl":{"source":"iana"},"text/vnd.wap.wml":{"source":"iana","extensions":["wml"]},"text/vnd.wap.wmlscript":{"source":"iana","extensions":["wmls"]},"text/vtt":{"charset":"UTF-8","compressible":true,"extensions":["vtt"]},"text/x-asm":{"source":"apache","extensions":["s","asm"]},"text/x-c":{"source":"apache","extensions":["c","cc","cxx","cpp","h","hh","dic"]},"text/x-component":{"source":"nginx","extensions":["htc"]},"text/x-fortran":{"source":"apache","extensions":["f","for","f77","f90"]},"text/x-gwt-rpc":{"compressible":true},"text/x-handlebars-template":{"extensions":["hbs"]},"text/x-java-source":{"source":"apache","extensions":["java"]},"text/x-jquery-tmpl":{"compressible":true},"text/x-lua":{"extensions":["lua"]},"text/x-markdown":{"compressible":true,"extensions":["mkd"]},"text/x-nfo":{"source":"apache","extensions":["nfo"]},"text/x-opml":{"source":"apache","extensions":["opml"]},"text/x-org":{"compressible":true,"extensions":["org"]},"text/x-pascal":{"source":"apache","extensions":["p","pas"]},"text/x-processing":{"compressible":true,"extensions":["pde"]},"text/x-sass":{"extensions":["sass"]},"text/x-scss":{"extensions":["scss"]},"text/x-setext":{"source":"apache","extensions":["etx"]},"text/x-sfv":{"source":"apache","extensions":["sfv"]},"text/x-suse-ymp":{"compressible":true,"extensions":["ymp"]},"text/x-uuencode":{"source":"apache","extensions":["uu"]},"text/x-vcalendar":{"source":"apache","extensions":["vcs"]},"text/x-vcard":{"source":"apache","extensions":["vcf"]},"text/xml":{"source":"iana","compressible":true,"extensions":["xml"]},"text/xml-external-parsed-entity":{"source":"iana"},"text/yaml":{"extensions":["yaml","yml"]},"video/1d-interleaved-parityfec":{"source":"iana"},"video/3gpp":{"source":"iana","extensions":["3gp","3gpp"]},"video/3gpp-tt":{"source":"iana"},"video/3gpp2":{"source":"iana","extensions":["3g2"]},"video/bmpeg":{"source":"iana"},"video/bt656":{"source":"iana"},"video/celb":{"source":"iana"},"video/dv":{"source":"iana"},"video/encaprtp":{"source":"iana"},"video/flexfec":{"source":"iana"},"video/h261":{"source":"iana","extensions":["h261"]},"video/h263":{"source":"iana","extensions":["h263"]},"video/h263-1998":{"source":"iana"},"video/h263-2000":{"source":"iana"},"video/h264":{"source":"iana","extensions":["h264"]},"video/h264-rcdo":{"source":"iana"},"video/h264-svc":{"source":"iana"},"video/h265":{"source":"iana"},"video/iso.segment":{"source":"iana"},"video/jpeg":{"source":"iana","extensions":["jpgv"]},"video/jpeg2000":{"source":"iana"},"video/jpm":{"source":"apache","extensions":["jpm","jpgm"]},"video/mj2":{"source":"iana","extensions":["mj2","mjp2"]},"video/mp1s":{"source":"iana"},"video/mp2p":{"source":"iana"},"video/mp2t":{"source":"iana","extensions":["ts"]},"video/mp4":{"source":"iana","compressible":false,"extensions":["mp4","mp4v","mpg4"]},"video/mp4v-es":{"source":"iana"},"video/mpeg":{"source":"iana","compressible":false,"extensions":["mpeg","mpg","mpe","m1v","m2v"]},"video/mpeg4-generic":{"source":"iana"},"video/mpv":{"source":"iana"},"video/nv":{"source":"iana"},"video/ogg":{"source":"iana","compressible":false,"extensions":["ogv"]},"video/parityfec":{"source":"iana"},"video/pointer":{"source":"iana"},"video/quicktime":{"source":"iana","compressible":false,"extensions":["qt","mov"]},"video/raptorfec":{"source":"iana"},"video/raw":{"source":"iana"},"video/rtp-enc-aescm128":{"source":"iana"},"video/rtploopback":{"source":"iana"},"video/rtx":{"source":"iana"},"video/smpte291":{"source":"iana"},"video/smpte292m":{"source":"iana"},"video/ulpfec":{"source":"iana"},"video/vc1":{"source":"iana"},"video/vc2":{"source":"iana"},"video/vnd.cctv":{"source":"iana"},"video/vnd.dece.hd":{"source":"iana","extensions":["uvh","uvvh"]},"video/vnd.dece.mobile":{"source":"iana","extensions":["uvm","uvvm"]},"video/vnd.dece.mp4":{"source":"iana"},"video/vnd.dece.pd":{"source":"iana","extensions":["uvp","uvvp"]},"video/vnd.dece.sd":{"source":"iana","extensions":["uvs","uvvs"]},"video/vnd.dece.video":{"source":"iana","extensions":["uvv","uvvv"]},"video/vnd.directv.mpeg":{"source":"iana"},"video/vnd.directv.mpeg-tts":{"source":"iana"},"video/vnd.dlna.mpeg-tts":{"source":"iana"},"video/vnd.dvb.file":{"source":"iana","extensions":["dvb"]},"video/vnd.fvt":{"source":"iana","extensions":["fvt"]},"video/vnd.hns.video":{"source":"iana"},"video/vnd.iptvforum.1dparityfec-1010":{"source":"iana"},"video/vnd.iptvforum.1dparityfec-2005":{"source":"iana"},"video/vnd.iptvforum.2dparityfec-1010":{"source":"iana"},"video/vnd.iptvforum.2dparityfec-2005":{"source":"iana"},"video/vnd.iptvforum.ttsavc":{"source":"iana"},"video/vnd.iptvforum.ttsmpeg2":{"source":"iana"},"video/vnd.motorola.video":{"source":"iana"},"video/vnd.motorola.videop":{"source":"iana"},"video/vnd.mpegurl":{"source":"iana","extensions":["mxu","m4u"]},"video/vnd.ms-playready.media.pyv":{"source":"iana","extensions":["pyv"]},"video/vnd.nokia.interleaved-multimedia":{"source":"iana"},"video/vnd.nokia.mp4vr":{"source":"iana"},"video/vnd.nokia.videovoip":{"source":"iana"},"video/vnd.objectvideo":{"source":"iana"},"video/vnd.radgamettools.bink":{"source":"iana"},"video/vnd.radgamettools.smacker":{"source":"iana"},"video/vnd.sealed.mpeg1":{"source":"iana"},"video/vnd.sealed.mpeg4":{"source":"iana"},"video/vnd.sealed.swf":{"source":"iana"},"video/vnd.sealedmedia.softseal.mov":{"source":"iana"},"video/vnd.uvvu.mp4":{"source":"iana","extensions":["uvu","uvvu"]},"video/vnd.vivo":{"source":"iana","extensions":["viv"]},"video/vnd.youtube.yt":{"source":"iana"},"video/vp8":{"source":"iana"},"video/webm":{"source":"apache","compressible":false,"extensions":["webm"]},"video/x-f4v":{"source":"apache","extensions":["f4v"]},"video/x-fli":{"source":"apache","extensions":["fli"]},"video/x-flv":{"source":"apache","compressible":false,"extensions":["flv"]},"video/x-m4v":{"source":"apache","extensions":["m4v"]},"video/x-matroska":{"source":"apache","compressible":false,"extensions":["mkv","mk3d","mks"]},"video/x-mng":{"source":"apache","extensions":["mng"]},"video/x-ms-asf":{"source":"apache","extensions":["asf","asx"]},"video/x-ms-vob":{"source":"apache","extensions":["vob"]},"video/x-ms-wm":{"source":"apache","extensions":["wm"]},"video/x-ms-wmv":{"source":"apache","compressible":false,"extensions":["wmv"]},"video/x-ms-wmx":{"source":"apache","extensions":["wmx"]},"video/x-ms-wvx":{"source":"apache","extensions":["wvx"]},"video/x-msvideo":{"source":"apache","extensions":["avi"]},"video/x-sgi-movie":{"source":"apache","extensions":["movie"]},"video/x-smv":{"source":"apache","extensions":["smv"]},"x-conference/x-cooltalk":{"source":"apache","extensions":["ice"]},"x-shader/x-fragment":{"compressible":true},"x-shader/x-vertex":{"compressible":true}}');

/***/ }),

/***/ 4293:
/***/ ((module) => {

"use strict";
module.exports = require("buffer");;

/***/ }),

/***/ 3129:
/***/ ((module) => {

"use strict";
module.exports = require("child_process");;

/***/ }),

/***/ 6417:
/***/ ((module) => {

"use strict";
module.exports = require("crypto");;

/***/ }),

/***/ 5747:
/***/ ((module) => {

"use strict";
module.exports = require("fs");;

/***/ }),

/***/ 8605:
/***/ ((module) => {

"use strict";
module.exports = require("http");;

/***/ }),

/***/ 7211:
/***/ ((module) => {

"use strict";
module.exports = require("https");;

/***/ }),

/***/ 2087:
/***/ ((module) => {

"use strict";
module.exports = require("os");;

/***/ }),

/***/ 5622:
/***/ ((module) => {

"use strict";
module.exports = require("path");;

/***/ }),

/***/ 2413:
/***/ ((module) => {

"use strict";
module.exports = require("stream");;

/***/ }),

/***/ 8835:
/***/ ((module) => {

"use strict";
module.exports = require("url");;

/***/ }),

/***/ 1669:
/***/ ((module) => {

"use strict";
module.exports = require("util");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __nccwpck_require__(3109);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map