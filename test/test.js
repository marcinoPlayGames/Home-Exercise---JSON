// Use dynamic import to import Chai
import('chai').then(module => {
    const chai = module.default;

    const verifyJSON = require('../verifyJSON');

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
            const result = verifyJSON(jsonData);
            console.log('Result of first test:', result);
            chai.expect(result).to.be.true;
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
            const result = verifyJSON(jsonData);
            console.log('Result of second test:', result);
            chai.expect(result).to.be.false;
        });

        it('should return false if JSON data is invalid or missing required fields', () => {
            const invalidData = {};
            const result = verifyJSON(invalidData);
            console.log('Result of third test:', result);
            chai.expect(result).to.be.false;
        });
    });
	
	describe('verifyJSON function edge cases', () => {
		it('should return false for an empty JSON object', () => {
			const jsonData = {};
			const result = verifyJSON(jsonData);
			chai.expect(result).to.be.false;
		});

		it('should return false if PolicyDocument field is missing', () => {
			const jsonData = {
				"PolicyName": "root"
			};
			const result = verifyJSON(jsonData);
			chai.expect(result).to.be.false;
		});

		it('should return false if Statement array is empty', () => {
			const jsonData = {
				"PolicyName": "root",
				"PolicyDocument": {
					"Version": "2012-10-17",
					"Statement": []
				}
			};
			const result = verifyJSON(jsonData);
			chai.expect(result).to.be.false;
		});

		// Add more test cases for other edge cases
	});
});
