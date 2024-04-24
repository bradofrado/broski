"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validPathRegex = /^(?!.*[\/\\]\.[^\/\\]*)(?!.*[\/\\]node_modules[\/\\])[^\s.\/\\][^\s]*\.(tsx|jsx|js)$/;
var isValidPath = function (path) {
    return validPathRegex.test(path);
};
function harmonyPlugin(babel) {
    var t = babel.types;
    var hasSpreadOperator = function (params) {
        return params.some(function (param) { return t.isRestElement(param); });
    };
    var constructPath = function (file, rootDir) {
        var indexOfRoot = file.indexOf(rootDir);
        if (!rootDir || indexOfRoot < 0) {
            throw new Error("Please specify valid rootDir property in config. Current rootDir: " + rootDir);
        }
        var relativeFile = file.substring(indexOfRoot + rootDir.length);
        if (relativeFile.startsWith('/')) {
            relativeFile = relativeFile.substring(1);
        }
        //Make the paths be unix friendly
        return relativeFile.replace('\\', '/');
    };
    var visitFunction = function (path, state) {
        var filePath = state.filename;
        if (!filePath) {
            throw new Error("Invalid rootDir path");
        }
        var node = path.node;
        if (isValidPath(filePath.substring(1)) && node.params.length < 2 && !hasSpreadOperator(node.params)) {
            var params = node.params.slice();
            var newParam = t.restElement(t.identifier('harmonyArguments'));
            if (node.params.length === 0) {
                path.pushContainer('params', newParam);
            }
            else {
                path.get('params')[0].replaceWith(newParam);
            }
            //path.scope.registerBinding('param', path.get('params')[0]);
            // path.scope.push({
            //     id: t.identifier('harmonyArguments')
            // })
            //node.params = [newParam];
            //path.scope.registerBinding('let', path.get('params'));
            if (params.length === 1) {
                var param = params[0];
                var defaultValue = t.isAssignmentPattern(param) ? param.right : undefined;
                var paramIdent = t.isAssignmentPattern(param) ? param.left : param;
                var init = t.memberExpression(t.identifier("harmonyArguments"), t.numericLiteral(0), true);
                if (defaultValue) {
                    init = t.logicalExpression('||', init, defaultValue);
                }
                var constDeclaration = t.variableDeclaration('let', [t.variableDeclarator(paramIdent, init)]);
                var pathBody = path.get('body');
                if (t.isExpression(pathBody.node)) {
                    var pathBody_1 = path.get('body');
                    pathBody_1.replaceWith(t.blockStatement([t.returnStatement(pathBody_1.node)]));
                    //node.body = t.blockStatement([t.returnStatement(expr)]);
                }
                pathBody.unshiftContainer('body', constDeclaration);
                // path.scope.push({
                //     id: paramIdent,
                //     init,
                //     kind: 'let'
                // });
                // const body = node.body;
                // body.body = [constDeclaration, ...body.body];
            }
        }
    };
    return {
        visitor: {
            'FunctionDeclaration|ArrowFunctionExpression': function (path, state) {
                var keepTranspiledCode = state.opts.keepTranspiledCode === true;
                if (path.type !== 'ArrowFunctionExpression' && path.type !== 'FunctionDeclaration') {
                    return;
                }
                visitFunction(path, state);
                path.traverse({
                    JSXElement: function (path, state) {
                        if (!path.node.loc)
                            return;
                        var relativePath = constructPath(state.filename, state.opts.rootDir);
                        var harmonyId = "".concat(relativePath, ":").concat(path.node.loc.start.line, ":").concat(path.node.loc.start.column, ":").concat(path.node.loc.end.line, ":").concat(path.node.loc.end.column);
                        var encodedHarmonyId = btoa(harmonyId);
                        var dataHarmonyIdAttribute = t.jsxAttribute(t.jsxIdentifier('data-harmony-id'), t.stringLiteral(encodedHarmonyId));
                        var parentExpression = t.optionalMemberExpression(t.memberExpression(t.identifier("harmonyArguments"), t.numericLiteral(0), true), t.stringLiteral("data-harmony-id"), true, true);
                        var undefinedCheck = t.conditionalExpression(t.binaryExpression('!==', t.unaryExpression('typeof', t.identifier('harmonyArguments')), t.stringLiteral('undefined')), parentExpression, t.nullLiteral());
                        var parentAttributeValue = t.jsxExpressionContainer(undefinedCheck);
                        var parentAttribute = t.jsxAttribute(t.jsxIdentifier("data-harmony-parent-id"), parentAttributeValue);
                        var attributes = path.get('openingElement');
                        attributes.pushContainer('attributes', dataHarmonyIdAttribute);
                        attributes.pushContainer('attributes', parentAttribute);
                        // path.node.openingElement.attributes.push(dataHarmonyIdAttribute);
                        // path.node.openingElement.attributes.push(parentAttribute);
                    }
                }, state);
                if (keepTranspiledCode) {
                    path.skip();
                }
            },
        }
    };
}
exports.default = harmonyPlugin;
