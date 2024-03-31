// Function to verify JSON data
function verifyJSON(jsonData) {
    if (jsonData && jsonData.PolicyDocument && jsonData.PolicyDocument.Statement) {
        const statements = jsonData.PolicyDocument.Statement;
        for (const statement of statements) {
            if (statement.Resource === "*") {
                return false;
            }
        }
        return true;
    }
    return false; // Invalid JSON structure
}

// Example JSON data
const jsonData = {
    "PolicyName": "root",
    "PolicyDocument": {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "IamListAccess",
                "Effect": "Allow",
                "Action": [
                    "iam:ListRoles",
                    "iam:ListUsers"
                ],
                "Resource": "*"
            }
        ]
    }
};

// Testing the function
console.log(verifyJSON(jsonData)); // Output: false

// Export the function for use in other modules if needed
module.exports = verifyJSON;