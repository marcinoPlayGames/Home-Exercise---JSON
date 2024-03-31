const { expect } = require('chai');
const verifyJSON = require('./verifyJSON');

describe('verifyJSON function', () => {
    it('should return true for valid JSON data', () => {
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
                        "Resource": "arn:aws:iam::123456789012:user/*"
                    }
                ]
            }
        };
        expect(verifyJSON(jsonData)).to.be.true;
    });

    it('should return false if JSON data contains a single asterisk in Resource field', () => {
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
        expect(verifyJSON(jsonData)).to.be.false;
    });

    it('should return false if JSON data is invalid or missing required fields', () => {
        const invalidData = {};
        expect(verifyJSON(invalidData)).to.be.false;
    });
});
