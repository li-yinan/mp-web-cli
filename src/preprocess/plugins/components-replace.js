export default function() {
    return {
        visitor: {
            ImportDeclaration(path) {
                let node = path.node;
                node.leadingComments.map(comment => {
                    var match = comment.value.match(/web\-replace:\s*(?<name>[\w\.\-\/]+)/);
                    if (match) {
                        node.source.value = match.groups.name;
                    }
                });
            }
        }
    }
}
