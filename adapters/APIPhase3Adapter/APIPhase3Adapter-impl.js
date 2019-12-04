/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/**
 * WL.Server.invokeHttp(parameters) accepts the following json object as an
 * argument: { // Mandatory method : 'get' , 'post', 'delete' , 'put' or 'head'
 * path: value, // Optional returnedContentType: any known mime-type or one of
 * "json", "css", "csv", "plain", "xml", "html" returnedContentEncoding :
 * 'encoding', parameters: {name1: value1, ... }, headers: {name1: value1, ... },
 * cookies: {name1: value1, ... }, body: { contentType: 'text/xml;
 * charset=utf-8' or similar value, content: stringValue }, transformation: {
 * type: 'default', or 'xslFile', xslFile: fileName } }
 */

function getCustomerPosition(customerId, bankId) {
	
	customerId = customerId+'';
	bankId = bankId+'';
	
	var bankId1 = '654321';
	var customerId1 = '123456789';
	if (customerId && customerId != '') {
		customerId1 = customerId;
	}
	if (bankId && bankId != '') {
		bankId1 = bankId;
	}

	WL.Logger.info('APIPhase3Adapter :: getCustomerPosition :: customerId='
			+ customerId1);
	WL.Logger.info('APIPhase3Adapter :: getCustomerPosition :: bankId='
			+ bankId1);

	var input = {
		method : 'get',
		returnedContentType : 'json',
		path : 'banking/accounts/v1/Banks/' + bankId1 + '/customers/'
				+ customerId1 + '/customerPosition?'
	};

	//return WL.Server.invokeHttp(input);
	if(customerId1 == '123456789'){
		return customer_position_natalie;
	}else{
		return customer_position_randolph;
	}
	
}

var customer_position_natalie = {
		  "netWorth": {
			    "amount": 523144.17,
			    "currencyCode": "USD"
			  },
			  "totalAsset": {
			    "amount": 564528.3,
			    "currencyCode": "USD"
			  },
			  "totalLiability": {
			    "amount": 41384.13,
			    "currencyCode": "USD"
			  },
			  "totalPoints": {
			    "amount": 30764,
			    "currencyCode": "POINTS"
			  },
			  "description": "Customer Position",
			  "validToDate": "2017-05-15T14:36:12-00:00",
			  "lastUpdatedDate": "2017-05-15T14:36:12-00:00",
			  "customer": {
			    "id": "123456789",
			    "userId": "nsmith",
			    "fullName": "Natalie Smith",
			    "shortName": "Natalie",
			    "picture": "",
			    "legalAddress": "",
			    "mobilePhoneNumber": "",
			    "email": "nsmith@gmail.com",
			    "phoneNumber": "",
			    "bankId": "654321"
			  },
			  "bankAccounts": [
			    {
			      "bank": {
			        "id": "654321",
			        "fullName": "Open Financial Network",
			        "shortName": "OpenFN",
			        "logo": "",
			        "website": "",
			        "legalAddress": ""
			      },
			      "accounts": [
			        {
			          "lastOverdrawnDate": "2015-05-05",
			          "maturityDate": "2015-02-01",
			          "id": "SAV1000",
			          "number": "003456652459",
			          "type": "DepositAccount:Savings",
			          "name": "OpenFN Mortgage Freedom Savings",
			          "description": "OpenFN Mortgage Freedom Savings",
			          "label": "Mortgage Freedom Savings - 2459",
			          "balance": {
			            "balanceStartDate": "2017-02-01T00:00:00-06:00",
			            "balanceEndDate": "2017-03-01T00:00:00-06:00",
			            "postedAmount": {
			              "amount": 32851.86, //32851.869999999995
			              "currencyCode": "USD"
			            },
			            "availableAmount": {
			              "amount": 32851.86, //32851.869999999995
			              "currencyCode": "USD"
			            }
			          },
			          "currency": "USD",
			          "accountLifecycleStatus": "Effective",
			          "lastActivityDate": "2017-05-09",
			          "lastStatementDate": "2017-02-01",
			          "customerIdentifier": "123456789",
			          "endDate": "2099-12-31",
			          "startDate": "2001-02-13",
			          "bankId": "654321"
			        },
			        {
			          "lastOverdrawnDate": "2015-05-05",
			          "maturityDate": "2015-02-01",
			          "id": "CHK1000",
			          "number": "003456652458",
			          "type": "DepositAccount:Checking",
			          "name": "OpenFN Advantage Plus Checking",
			          "description": "OpenFN Advantage Plus Checking",
			          "label": "Advantage Plus Checking - 2458",
			          "balance": {
			            "balanceStartDate": "2017-02-01T00:00:00-06:00",
			            "balanceEndDate": "2017-03-01T00:00:00-06:00",
			            "postedAmount": {
			              "amount": 8200.00, //8453.874999999996
			              "currencyCode": "USD"
			            },
			            "availableAmount": {
			              "amount": 8200.00, //8453.874999999996
			              "currencyCode": "USD"
			            }
			          },
			          "currency": "USD",
			          "accountLifecycleStatus": "Effective",
			          "lastActivityDate": "2017-05-11",
			          "lastStatementDate": "2017-02-01",
			          "customerIdentifier": "123456789",
			          "endDate": "2099-12-31",
			          "startDate": "2001-02-13",
			          "bankId": "654321"
			        },
			        {
			          "creditLimit": {
			            "amount": 20000,
			            "currencyCode": "USD"
			          },
			          "cashCreditLimit": {
			            "amount": 400,
			            "currencyCode": "USD"
			          },
			          "lastPayment": {
			            "amount": 210.5,
			            "currencyCode": "USD"
			          },
			          "lastPaymentDate": "2017-02-13T00:00:00-06:00",
			          "minimumPayment": {
			            "amount": 210.5,
			            "currencyCode": "USD"
			          },
			          "minimumPaymentDueDate": "2017-03-01T00:00:00-06:00",
			          "payoffBalance": {
			            "amount": 5809.07,
			            "currencyCode": "USD"
			          },
			          "id": "CNC1000",
			          "number": "5869536578542460",
			          "type": "CreditCardAccount",
			          "name": "OpenFN Travel Rewards Credit Card",
			          "description": "OpenFN Travel Rewards Credit Card",
			          "label": "Travel Rewards Credit Card - 2460",
			          "balance": {
			            "balanceStartDate": "2017-02-01T00:00:00-06:00",
			            "balanceEndDate": "2017-03-01T00:00:00-06:00",
			            "postedAmount": {
			              "amount": 12400, //8645.22
			              "currencyCode": "USD"
			            },
			            "availableAmount": {
			              "amount": 12400, //8645.22
			              "currencyCode": "USD"
			            }
			          },
			          "currency": "USD",
			          "accountLifecycleStatus": "Effective",
			          "lastActivityDate": "2017-05-10",
			          "lastStatementDate": "2017-02-13",
			          "customerIdentifier": "123456789",
			          "endDate": "2099-12-31",
			          "startDate": "2003-07-29",
			          "bankId": "654321"
			        }
			      ]
			    },
			    {
			      "bank": {
			        "id": "654322",
			        "fullName": "Star Credit Union",
			        "shortName": "Star Credit Union",
			        "logo": "",
			        "website": "",
			        "legalAddress": ""
			      },
			      "accounts": [
			        {
			          "term": "30-year",
			          "amountBorrowed": {
			            "amount": 204000,
			            "currencyCode": "USD"
			          },
			          "payoffBalance": {
			            "amount": 32738.91,
			            "currencyCode": "USD"
			          },
			          "lastPayment": {
			            "amount": 1469.9,
			            "currencyCode": "USD"
			          },
			          "lastPaymentDate": "2017-02-01T00:00:00-06:00",
			          "minimumPayment": {
			            "amount": 1469.9,
			            "currencyCode": "USD"
			          },
			          "minimumPaymentDueDate": "2017-02-05T00:00:00-06:00",
			          "mortgagePurpose": "Primary Residence",
			          "paymentTotalNumber": 360,
			          "paymentPaidNumber": 320,
			          "marketValueOfCollateral": {
			            "amount": 255000,
			            "currencyCode": "USD"
			          },
			          "marketValueOfCollateralDate": "2017-01-01",
			          "requestedBaseLoanAmount": {
			            "amount": 204000,
			            "currencyCode": "USD"
			          },
			          "sourceOfDeposit": "Checking",
			          "repaymentType": "Amortized",
			          "amortizationType": "Fixed",
			          "isRefinance": false,
			          "paymentDelinquentNumber": 0,
			          "paymentInitialDate": "1991-11-01",
			          "paymentPeriod": "Monthly",
			          "interestRate": 3.625,
			          "id": "MOR1000",
			          "number": "003456657633",
			          "type": "MortgageAccount",
			          "name": "StarCU Mortgage Account",
			          "description": "StarCU Mortgage Account",
			          "label": "StarCU Mortgage - 7633",
			          "balance": {
			            "balanceStartDate": "2017-02-01T00:00:00-06:00",
			            "balanceEndDate": "2017-03-01T00:00:00-06:00",
			            "postedAmount": {
			              "amount": 32738.91,
			              "currencyCode": "USD"
			            },
			            "availableAmount": {
			              "amount": 32738.91,
			              "currencyCode": "USD"
			            }
			          },
			          "currency": "USD",
			          "accountLifecycleStatus": "Effective",
			          "lastActivityDate": "2017-02-01",
			          "lastStatementDate": "2017-02-01",
			          "customerIdentifier": "223456789",
			          "endDate": "2020-10-01",
			          "startDate": "1991-09-22",
			          "bankId": "654322",
			          "paymentRemaininNumber": 40
			        }
			      ]
			    },
			    {
			      "bank": {
			        "id": "654323",
			        "fullName": "Investment Benefits",
			        "shortName": "Investment Benefits",
			        "logo": "",
			        "website": "",
			        "legalAddress": ""
			      },
			      "accounts": [
			        {
			          "totalMarketValueOfInvestments": {
			            "amount": 268222.56,
			            "currencyCode": "USD"
			          },
			          "totalMarketValueOfInvestmentsDate": "2017-03-01",
			          "cashValue": {
			            "amount": 0,
			            "currencyCode": "USD"
			          },
			          "amountBorrowed": {
			            "amount": 0,
			            "currencyCode": "USD"
			          },
			          "lastDeposit": {
			            "amount": 771.98,
			            "currencyCode": "USD"
			          },
			          "lastDepositDate": "2017-02-28T00:00:00-06:00",
			          "lastWithdraw": {
			            "amount": 0,
			            "currencyCode": "USD"
			          },
			          "lastWithdrawDate": "2001-09-01T00:00:00-06:00",
			          "isMarginAccount": false,
			          "investments": [
			            {
			              "symbol": "VTSAX",
			              "description": "Vanguard Total Stock Market Index Fund",
			              "marketValue": {
			                "amount": 107296.35,
			                "currencyCode": "USD"
			              },
			              "marketValueDate": "2017-03-01",
			              "assetType": "Equity",
			              "quantity": 1785,
			              "price": {
			                "amount": 60.11,
			                "currencyCode": "USD"
			              },
			              "value": {
			                "amount": 107296.35,
			                "currencyCode": "USD"
			              },
			              "cost": {
			                "amount": 51953.32,
			                "currencyCode": "USD"
			              },
			              "costDate": "2011-07-13T00:00:00-06:00"
			            },
			            {
			              "symbol": "VFWAX",
			              "description": "Vanguard FTSE All-World ex-US Index Fund",
			              "marketValue": {
			                "amount": 53629.56,
			                "currencyCode": "USD"
			              },
			              "marketValueDate": "2017-03-01",
			              "assetType": "Equity",
			              "quantity": 1836,
			              "price": {
			                "amount": 29.21,
			                "currencyCode": "USD"
			              },
			              "value": {
			                "amount": 53629.56,
			                "currencyCode": "USD"
			              },
			              "cost": {
			                "amount": 47341.66,
			                "currencyCode": "USD"
			              },
			              "costDate": "2013-10-11T00:00:00-06:00"
			            },
			            {
			              "symbol": "VBTLX",
			              "description": "Vanguard Total Bond Market Index Fund",
			              "marketValue": {
			                "amount": 80471.4,
			                "currencyCode": "USD"
			              },
			              "marketValueDate": "2017-03-01",
			              "assetType": "Fixed Income",
			              "quantity": 7556,
			              "price": {
			                "amount": 10.65,
			                "currencyCode": "USD"
			              },
			              "value": {
			                "amount": 80471.4,
			                "currencyCode": "USD"
			              },
			              "cost": {
			                "amount": 71953.32,
			                "currencyCode": "USD"
			              },
			              "costDate": "2014-12-13T00:00:00-06:00"
			            },
			            {
			              "symbol": "VUSUX",
			              "description": "Vanguard Long-Term Treasury Fund",
			              "marketValue": {
			                "amount": 26825.25,
			                "currencyCode": "USD"
			              },
			              "marketValueDate": "2017-03-01",
			              "assetType": "Fixed Income",
			              "quantity": 2283,
			              "price": {
			                "amount": 11.75,
			                "currencyCode": "USD"
			              },
			              "value": {
			                "amount": 26825.25,
			                "currencyCode": "USD"
			              },
			              "cost": {
			                "amount": 17539.32,
			                "currencyCode": "USD"
			              },
			              "costDate": "2011-12-13T00:00:00-06:00"
			            }
			          ],
			          "id": "INV1000",
			          "number": "003456653020",
			          "type": "InvestmentAccount:Retirement",
			          "name": "My 401(K) Plan",
			          "description": "My 401(K) Plan",
			          "label": "My 401(K) Plan - 3020",
			          "balance": {
			            "balanceStartDate": "2017-02-01T00:00:00-06:00",
			            "balanceEndDate": "2017-03-01T00:00:00-06:00",
			            "postedAmount": {
			              "amount": 268222.56,
			              "currencyCode": "USD"
			            },
			            "availableAmount": {
			              "amount": 268222.56,
			              "currencyCode": "USD"
			            }
			          },
			          "currency": "USD",
			          "accountLifecycleStatus": "Effective",
			          "lastActivityDate": "2017-02-15",
			          "lastStatementDate": "2017-02-01",
			          "customerIdentifier": "323456789",
			          "endDate": "2099-12-31",
			          "startDate": "2001-09-01",
			          "bankId": "654323"
			        }
			      ]
			    }
			  ],
			  "asset": {
			    "total": {
			      "amount": 564528.3,
			      "currencyCode": "USD"
			    },
			    "description": "Total Assets",
			    "allocations": [
			      {
			        "type": "Cash",
			        "amount": {
			          "amount": 41305.74,
			          "currencyCode": "USD"
			        },
			        "percentage": 7.32
			      },
			      {
			        "type": "Real Estate",
			        "amount": {
			          "amount": 255000,
			          "currencyCode": "USD"
			        },
			        "percentage": 45.17
			      },
			      {
			        "type": "Equity",
			        "amount": {
			          "amount": 160925.91,
			          "currencyCode": "USD"
			        },
			        "percentage": 28.51
			      },
			      {
			        "type": "Fixed Income",
			        "amount": {
			          "amount": 107296.65,
			          "currencyCode": "USD"
			        },
			        "percentage": 19.01
			      }
			    ]
			  },
			  "liability": {
			    "total": {
			      "amount": 41384.13,
			      "currencyCode": "USD"
			    },
			    "description": "Total Liabilities",
			    "allocations": [
			      {
			        "type": "Credit Card",
			        "amount": {
			          "amount": 8645.22,
			          "currencyCode": "USD"
			        },
			        "percentage": 20.89
			      },
			      {
			        "type": "Mortgage",
			        "amount": {
			          "amount": 32738.91,
			          "currencyCode": "USD"
			        },
			        "percentage": 79.11
			      }
			    ]
			  },
			  "positionHistory": [
			    {
			      "validDate": "2017-05-15T14:36:13-00:00",
			      "description": "Position for May 2017",
			      "netWorth": {
			        "amount": 523144.17,
			        "currencyCode": "USD"
			      },
			      "totalAsset": {
			        "amount": 564528.3,
			        "currencyCode": "USD"
			      },
			      "totalLiability": {
			        "amount": 41384.13,
			        "currencyCode": "USD"
			      }
			    },
			    {
			      "validDate": "2017-04-01T00:00:00-00:00",
			      "description": "Position for April 2017",
			      "netWorth": {
			        "amount": 543029.7,
			        "currencyCode": "USD"
			      },
			      "totalAsset": {
			        "amount": 581577.68,
			        "currencyCode": "USD"
			      },
			      "totalLiability": {
			        "amount": 38547.98,
			        "currencyCode": "USD"
			      }
			    },
			    {
			      "validDate": "2017-03-01T00:00:00-00:00",
			      "description": "Position for March 2017",
			      "netWorth": {
			        "amount": 541142.64,
			        "currencyCode": "USD"
			      },
			      "totalAsset": {
			        "amount": 580079.32,
			        "currencyCode": "USD"
			      },
			      "totalLiability": {
			        "amount": 38936.68,
			        "currencyCode": "USD"
			      }
			    },
			    {
			      "validDate": "2017-02-01T00:00:00-00:00",
			      "description": "Position for February 2017",
			      "netWorth": {
			        "amount": 541693.79,
			        "currencyCode": "USD"
			      },
			      "totalAsset": {
			        "amount": 580533.33,
			        "currencyCode": "USD"
			      },
			      "totalLiability": {
			        "amount": 38839.54,
			        "currencyCode": "USD"
			      }
			    },
			    {
			      "validDate": "2017-01-01T00:00:00-00:00",
			      "description": "Position for January 2017",
			      "netWorth": {
			        "amount": 540724.34,
			        "currencyCode": "USD"
			      },
			      "totalAsset": {
			        "amount": 586634.62,
			        "currencyCode": "USD"
			      },
			      "totalLiability": {
			        "amount": 45910.28,
			        "currencyCode": "USD"
			      }
			    },
			    {
			      "validDate": "2016-12-01T00:00:00-00:00",
			      "description": "Position for December 2016",
			      "netWorth": {
			        "amount": 538198.45,
			        "currencyCode": "USD"
			      },
			      "totalAsset": {
			        "amount": 593589.32,
			        "currencyCode": "USD"
			      },
			      "totalLiability": {
			        "amount": 55390.87,
			        "currencyCode": "USD"
			      }
			    },
			    {
			      "validDate": "2016-11-01T00:00:00-00:00",
			      "description": "Position for November 2016",
			      "netWorth": {
			        "amount": 516277.47,
			        "currencyCode": "USD"
			      },
			      "totalAsset": {
			        "amount": 581155.45,
			        "currencyCode": "USD"
			      },
			      "totalLiability": {
			        "amount": 64877.98,
			        "currencyCode": "USD"
			      }
			    },
			    {
			      "validDate": "2016-10-01T00:00:00-00:00",
			      "description": "Position for October 2016",
			      "netWorth": {
			        "amount": 508923.66,
			        "currencyCode": "USD"
			      },
			      "totalAsset": {
			        "amount": 564567.88,
			        "currencyCode": "USD"
			      },
			      "totalLiability": {
			        "amount": 55644.22,
			        "currencyCode": "USD"
			      }
			    },
			    {
			      "validDate": "2016-09-01T00:00:00-00:00",
			      "description": "Position for September 2016",
			      "netWorth": {
			        "amount": 502930.4,
			        "currencyCode": "USD"
			      },
			      "totalAsset": {
			        "amount": 562567.89,
			        "currencyCode": "USD"
			      },
			      "totalLiability": {
			        "amount": 59637.49,
			        "currencyCode": "USD"
			      }
			    },
			    {
			      "validDate": "2016-08-01T00:00:00-00:00",
			      "description": "Position for August 2016",
			      "netWorth": {
			        "amount": 472930.4,
			        "currencyCode": "USD"
			      },
			      "totalAsset": {
			        "amount": 522567.85,
			        "currencyCode": "USD"
			      },
			      "totalLiability": {
			        "amount": 49637.45,
			        "currencyCode": "USD"
			      }
			    },
			    {
			      "validDate": "2016-07-01T00:00:00-00:00",
			      "description": "Position for July 2016",
			      "netWorth": {
			        "amount": 473929.57,
			        "currencyCode": "USD"
			      },
			      "totalAsset": {
			        "amount": 523367.22,
			        "currencyCode": "USD"
			      },
			      "totalLiability": {
			        "amount": 49437.65,
			        "currencyCode": "USD"
			      }
			    },
			    {
			      "validDate": "2016-06-01T00:00:00-00:00",
			      "description": "Position for June 2016",
			      "netWorth": {
			        "amount": 460758.73,
			        "currencyCode": "USD"
			      },
			      "totalAsset": {
			        "amount": 520196.35,
			        "currencyCode": "USD"
			      },
			      "totalLiability": {
			        "amount": 59437.62,
			        "currencyCode": "USD"
			      }
			    },
			    {
			      "validDate": "2016-05-01T00:00:00-00:00",
			      "description": "Position for May 2016",
			      "netWorth": {
			        "amount": 456561.42,
			        "currencyCode": "USD"
			      },
			      "totalAsset": {
			        "amount": 518996.87,
			        "currencyCode": "USD"
			      },
			      "totalLiability": {
			        "amount": 62435.45,
			        "currencyCode": "USD"
			      }
			    },
			    {
			      "validDate": "2016-04-01T00:00:00-00:00",
			      "description": "Position for April 2016",
			      "netWorth": {
			        "amount": 446253.83,
			        "currencyCode": "USD"
			      },
			      "totalAsset": {
			        "amount": 512977.48,
			        "currencyCode": "USD"
			      },
			      "totalLiability": {
			        "amount": 66723.65,
			        "currencyCode": "USD"
			      }
			    },
			    {
			      "validDate": "2016-03-01T00:00:00-00:00",
			      "description": "Position for March 2016",
			      "netWorth": {
			        "amount": 445254.16,
			        "currencyCode": "USD"
			      },
			      "totalAsset": {
			        "amount": 479977.48,
			        "currencyCode": "USD"
			      },
			      "totalLiability": {
			        "amount": 34723.32,
			        "currencyCode": "USD"
			      }
			    }
			  ]
			};


var customer_position_randolph = {
		  "netWorth": {
			    "amount": 523144.17,
			    "currencyCode": "USD"
			  },
			  "totalAsset": {
			    "amount": 564528.3,
			    "currencyCode": "USD"
			  },
			  "totalLiability": {
			    "amount": 41384.13,
			    "currencyCode": "USD"
			  },
			  "totalPoints": {
			    "amount": 30764,
			    "currencyCode": "POINTS"
			  },
			  "description": "Customer Position",
			  "validToDate": "2017-05-15T14:36:12-00:00",
			  "lastUpdatedDate": "2017-05-15T14:36:12-00:00",
			  "customer": {
			    "id": "987654321",
			    "userId": "rhoke",
			    "fullName": "Randolph Hoke",
			    "shortName": "Randolph",
			    "picture": "",
			    "legalAddress": "",
			    "mobilePhoneNumber": "",
			    "email": "rhoke@gmail.com",
			    "phoneNumber": "",
			    "bankId": "654321"
			  },
			  "bankAccounts": [
			    {
			      "bank": {
			        "id": "654321",
			        "fullName": "Open Financial Network",
			        "shortName": "OpenFN",
			        "logo": "",
			        "website": "",
			        "legalAddress": ""
			      },
			      "accounts": [
			        {
			          "lastOverdrawnDate": "2015-05-05",
			          "maturityDate": "2015-02-01",
			          "id": "SAV1000",
			          "number": "003456652459",
			          "type": "DepositAccount:Savings",
			          "name": "OpenFN Mortgage Freedom Savings",
			          "description": "OpenFN Mortgage Freedom Savings",
			          "label": "Mortgage Freedom Savings - 2459",
			          "balance": {
			            "balanceStartDate": "2017-02-01T00:00:00-06:00",
			            "balanceEndDate": "2017-03-01T00:00:00-06:00",
			            "postedAmount": {
			              "amount": 32851.86, //32851.869999999995
			              "currencyCode": "USD"
			            },
			            "availableAmount": {
			              "amount": 32851.86, //32851.869999999995
			              "currencyCode": "USD"
			            }
			          },
			          "currency": "USD",
			          "accountLifecycleStatus": "Effective",
			          "lastActivityDate": "2017-05-09",
			          "lastStatementDate": "2017-02-01",
			          "customerIdentifier": "987654321",
			          "endDate": "2099-12-31",
			          "startDate": "2001-02-13",
			          "bankId": "654321"
			        },
			        {
			          "lastOverdrawnDate": "2015-05-05",
			          "maturityDate": "2015-02-01",
			          "id": "CHK1000",
			          "number": "003456652458",
			          "type": "DepositAccount:Checking",
			          "name": "OpenFN Advantage Plus Checking",
			          "description": "OpenFN Advantage Plus Checking",
			          "label": "Advantage Plus Checking - 2458",
			          "balance": {
			            "balanceStartDate": "2017-02-01T00:00:00-06:00",
			            "balanceEndDate": "2017-03-01T00:00:00-06:00",
			            "postedAmount": {
			              "amount": 8200.00, //8453.874999999996
			              "currencyCode": "USD"
			            },
			            "availableAmount": {
			              "amount": 8200.00, //8453.874999999996
			              "currencyCode": "USD"
			            }
			          },
			          "currency": "USD",
			          "accountLifecycleStatus": "Effective",
			          "lastActivityDate": "2017-05-11",
			          "lastStatementDate": "2017-02-01",
			          "customerIdentifier": "987654321",
			          "endDate": "2099-12-31",
			          "startDate": "2001-02-13",
			          "bankId": "654321"
			        },
			        {
			          "creditLimit": {
			            "amount": 20000,
			            "currencyCode": "USD"
			          },
			          "cashCreditLimit": {
			            "amount": 400,
			            "currencyCode": "USD"
			          },
			          "lastPayment": {
			            "amount": 210.5,
			            "currencyCode": "USD"
			          },
			          "lastPaymentDate": "2017-02-13T00:00:00-06:00",
			          "minimumPayment": {
			            "amount": 210.5,
			            "currencyCode": "USD"
			          },
			          "minimumPaymentDueDate": "2017-03-01T00:00:00-06:00",
			          "payoffBalance": {
			            "amount": 5809.07,
			            "currencyCode": "USD"
			          },
			          "id": "CNC1000",
			          "number": "5869536578542460",
			          "type": "CreditCardAccount",
			          "name": "OpenFN Travel Rewards Credit Card",
			          "description": "OpenFN Travel Rewards Credit Card",
			          "label": "Travel Rewards Credit Card - 2460",
			          "balance": {
			            "balanceStartDate": "2017-02-01T00:00:00-06:00",
			            "balanceEndDate": "2017-03-01T00:00:00-06:00",
			            "postedAmount": {
			              "amount": 12400, //8645.22
			              "currencyCode": "USD"
			            },
			            "availableAmount": {
			              "amount": 12400, //8645.22
			              "currencyCode": "USD"
			            }
			          },
			          "currency": "USD",
			          "accountLifecycleStatus": "Effective",
			          "lastActivityDate": "2017-05-10",
			          "lastStatementDate": "2017-02-13",
			          "customerIdentifier": "987654321",
			          "endDate": "2099-12-31",
			          "startDate": "2003-07-29",
			          "bankId": "654321"
			        }
			      ]
			    },
			    {
			      "bank": {
			        "id": "654322",
			        "fullName": "Star Credit Union",
			        "shortName": "Star Credit Union",
			        "logo": "",
			        "website": "",
			        "legalAddress": ""
			      },
			      "accounts": [
			        {
			          "term": "30-year",
			          "amountBorrowed": {
			            "amount": 204000,
			            "currencyCode": "USD"
			          },
			          "payoffBalance": {
			            "amount": 32738.91,
			            "currencyCode": "USD"
			          },
			          "lastPayment": {
			            "amount": 1469.9,
			            "currencyCode": "USD"
			          },
			          "lastPaymentDate": "2017-02-01T00:00:00-06:00",
			          "minimumPayment": {
			            "amount": 1469.9,
			            "currencyCode": "USD"
			          },
			          "minimumPaymentDueDate": "2017-02-05T00:00:00-06:00",
			          "mortgagePurpose": "Primary Residence",
			          "paymentTotalNumber": 360,
			          "paymentPaidNumber": 320,
			          "marketValueOfCollateral": {
			            "amount": 255000,
			            "currencyCode": "USD"
			          },
			          "marketValueOfCollateralDate": "2017-01-01",
			          "requestedBaseLoanAmount": {
			            "amount": 204000,
			            "currencyCode": "USD"
			          },
			          "sourceOfDeposit": "Checking",
			          "repaymentType": "Amortized",
			          "amortizationType": "Fixed",
			          "isRefinance": false,
			          "paymentDelinquentNumber": 0,
			          "paymentInitialDate": "1991-11-01",
			          "paymentPeriod": "Monthly",
			          "interestRate": 3.625,
			          "id": "MOR1000",
			          "number": "003456657633",
			          "type": "MortgageAccount",
			          "name": "StarCU Mortgage Account",
			          "description": "StarCU Mortgage Account",
			          "label": "StarCU Mortgage - 7633",
			          "balance": {
			            "balanceStartDate": "2017-02-01T00:00:00-06:00",
			            "balanceEndDate": "2017-03-01T00:00:00-06:00",
			            "postedAmount": {
			              "amount": 32738.91,
			              "currencyCode": "USD"
			            },
			            "availableAmount": {
			              "amount": 32738.91,
			              "currencyCode": "USD"
			            }
			          },
			          "currency": "USD",
			          "accountLifecycleStatus": "Effective",
			          "lastActivityDate": "2017-02-01",
			          "lastStatementDate": "2017-02-01",
			          "customerIdentifier": "223456789",
			          "endDate": "2020-10-01",
			          "startDate": "1991-09-22",
			          "bankId": "654322",
			          "paymentRemaininNumber": 40
			        }
			      ]
			    },
			    {
			      "bank": {
			        "id": "654323",
			        "fullName": "Investment Benefits",
			        "shortName": "Investment Benefits",
			        "logo": "",
			        "website": "",
			        "legalAddress": ""
			      },
			      "accounts": [
			        {
			          "totalMarketValueOfInvestments": {
			            "amount": 268222.56,
			            "currencyCode": "USD"
			          },
			          "totalMarketValueOfInvestmentsDate": "2017-03-01",
			          "cashValue": {
			            "amount": 0,
			            "currencyCode": "USD"
			          },
			          "amountBorrowed": {
			            "amount": 0,
			            "currencyCode": "USD"
			          },
			          "lastDeposit": {
			            "amount": 771.98,
			            "currencyCode": "USD"
			          },
			          "lastDepositDate": "2017-02-28T00:00:00-06:00",
			          "lastWithdraw": {
			            "amount": 0,
			            "currencyCode": "USD"
			          },
			          "lastWithdrawDate": "2001-09-01T00:00:00-06:00",
			          "isMarginAccount": false,
			          "investments": [
			            {
			              "symbol": "VTSAX",
			              "description": "Vanguard Total Stock Market Index Fund",
			              "marketValue": {
			                "amount": 107296.35,
			                "currencyCode": "USD"
			              },
			              "marketValueDate": "2017-03-01",
			              "assetType": "Equity",
			              "quantity": 1785,
			              "price": {
			                "amount": 60.11,
			                "currencyCode": "USD"
			              },
			              "value": {
			                "amount": 107296.35,
			                "currencyCode": "USD"
			              },
			              "cost": {
			                "amount": 51953.32,
			                "currencyCode": "USD"
			              },
			              "costDate": "2011-07-13T00:00:00-06:00"
			            },
			            {
			              "symbol": "VFWAX",
			              "description": "Vanguard FTSE All-World ex-US Index Fund",
			              "marketValue": {
			                "amount": 53629.56,
			                "currencyCode": "USD"
			              },
			              "marketValueDate": "2017-03-01",
			              "assetType": "Equity",
			              "quantity": 1836,
			              "price": {
			                "amount": 29.21,
			                "currencyCode": "USD"
			              },
			              "value": {
			                "amount": 53629.56,
			                "currencyCode": "USD"
			              },
			              "cost": {
			                "amount": 47341.66,
			                "currencyCode": "USD"
			              },
			              "costDate": "2013-10-11T00:00:00-06:00"
			            },
			            {
			              "symbol": "VBTLX",
			              "description": "Vanguard Total Bond Market Index Fund",
			              "marketValue": {
			                "amount": 80471.4,
			                "currencyCode": "USD"
			              },
			              "marketValueDate": "2017-03-01",
			              "assetType": "Fixed Income",
			              "quantity": 7556,
			              "price": {
			                "amount": 10.65,
			                "currencyCode": "USD"
			              },
			              "value": {
			                "amount": 80471.4,
			                "currencyCode": "USD"
			              },
			              "cost": {
			                "amount": 71953.32,
			                "currencyCode": "USD"
			              },
			              "costDate": "2014-12-13T00:00:00-06:00"
			            },
			            {
			              "symbol": "VUSUX",
			              "description": "Vanguard Long-Term Treasury Fund",
			              "marketValue": {
			                "amount": 26825.25,
			                "currencyCode": "USD"
			              },
			              "marketValueDate": "2017-03-01",
			              "assetType": "Fixed Income",
			              "quantity": 2283,
			              "price": {
			                "amount": 11.75,
			                "currencyCode": "USD"
			              },
			              "value": {
			                "amount": 26825.25,
			                "currencyCode": "USD"
			              },
			              "cost": {
			                "amount": 17539.32,
			                "currencyCode": "USD"
			              },
			              "costDate": "2011-12-13T00:00:00-06:00"
			            }
			          ],
			          "id": "INV1000",
			          "number": "003456653020",
			          "type": "InvestmentAccount:Retirement",
			          "name": "My 401(K) Plan",
			          "description": "My 401(K) Plan",
			          "label": "My 401(K) Plan - 3020",
			          "balance": {
			            "balanceStartDate": "2017-02-01T00:00:00-06:00",
			            "balanceEndDate": "2017-03-01T00:00:00-06:00",
			            "postedAmount": {
			              "amount": 268222.56,
			              "currencyCode": "USD"
			            },
			            "availableAmount": {
			              "amount": 268222.56,
			              "currencyCode": "USD"
			            }
			          },
			          "currency": "USD",
			          "accountLifecycleStatus": "Effective",
			          "lastActivityDate": "2017-02-15",
			          "lastStatementDate": "2017-02-01",
			          "customerIdentifier": "323456789",
			          "endDate": "2099-12-31",
			          "startDate": "2001-09-01",
			          "bankId": "654323"
			        }
			      ]
			    }
			  ],
			  "asset": {
			    "total": {
			      "amount": 564528.3,
			      "currencyCode": "USD"
			    },
			    "description": "Total Assets",
			    "allocations": [
			      {
			        "type": "Cash",
			        "amount": {
			          "amount": 41305.74,
			          "currencyCode": "USD"
			        },
			        "percentage": 7.32
			      },
			      {
			        "type": "Real Estate",
			        "amount": {
			          "amount": 255000,
			          "currencyCode": "USD"
			        },
			        "percentage": 45.17
			      },
			      {
			        "type": "Equity",
			        "amount": {
			          "amount": 160925.91,
			          "currencyCode": "USD"
			        },
			        "percentage": 28.51
			      },
			      {
			        "type": "Fixed Income",
			        "amount": {
			          "amount": 107296.65,
			          "currencyCode": "USD"
			        },
			        "percentage": 19.01
			      }
			    ]
			  },
			  "liability": {
			    "total": {
			      "amount": 41384.13,
			      "currencyCode": "USD"
			    },
			    "description": "Total Liabilities",
			    "allocations": [
			      {
			        "type": "Credit Card",
			        "amount": {
			          "amount": 8645.22,
			          "currencyCode": "USD"
			        },
			        "percentage": 20.89
			      },
			      {
			        "type": "Mortgage",
			        "amount": {
			          "amount": 32738.91,
			          "currencyCode": "USD"
			        },
			        "percentage": 79.11
			      }
			    ]
			  },
			  "positionHistory": [
			    {
			      "validDate": "2017-05-15T14:36:13-00:00",
			      "description": "Position for May 2017",
			      "netWorth": {
			        "amount": 523144.17,
			        "currencyCode": "USD"
			      },
			      "totalAsset": {
			        "amount": 564528.3,
			        "currencyCode": "USD"
			      },
			      "totalLiability": {
			        "amount": 41384.13,
			        "currencyCode": "USD"
			      }
			    },
			    {
			      "validDate": "2017-04-01T00:00:00-00:00",
			      "description": "Position for April 2017",
			      "netWorth": {
			        "amount": 543029.7,
			        "currencyCode": "USD"
			      },
			      "totalAsset": {
			        "amount": 581577.68,
			        "currencyCode": "USD"
			      },
			      "totalLiability": {
			        "amount": 38547.98,
			        "currencyCode": "USD"
			      }
			    },
			    {
			      "validDate": "2017-03-01T00:00:00-00:00",
			      "description": "Position for March 2017",
			      "netWorth": {
			        "amount": 541142.64,
			        "currencyCode": "USD"
			      },
			      "totalAsset": {
			        "amount": 580079.32,
			        "currencyCode": "USD"
			      },
			      "totalLiability": {
			        "amount": 38936.68,
			        "currencyCode": "USD"
			      }
			    },
			    {
			      "validDate": "2017-02-01T00:00:00-00:00",
			      "description": "Position for February 2017",
			      "netWorth": {
			        "amount": 541693.79,
			        "currencyCode": "USD"
			      },
			      "totalAsset": {
			        "amount": 580533.33,
			        "currencyCode": "USD"
			      },
			      "totalLiability": {
			        "amount": 38839.54,
			        "currencyCode": "USD"
			      }
			    },
			    {
			      "validDate": "2017-01-01T00:00:00-00:00",
			      "description": "Position for January 2017",
			      "netWorth": {
			        "amount": 540724.34,
			        "currencyCode": "USD"
			      },
			      "totalAsset": {
			        "amount": 586634.62,
			        "currencyCode": "USD"
			      },
			      "totalLiability": {
			        "amount": 45910.28,
			        "currencyCode": "USD"
			      }
			    },
			    {
			      "validDate": "2016-12-01T00:00:00-00:00",
			      "description": "Position for December 2016",
			      "netWorth": {
			        "amount": 538198.45,
			        "currencyCode": "USD"
			      },
			      "totalAsset": {
			        "amount": 593589.32,
			        "currencyCode": "USD"
			      },
			      "totalLiability": {
			        "amount": 55390.87,
			        "currencyCode": "USD"
			      }
			    },
			    {
			      "validDate": "2016-11-01T00:00:00-00:00",
			      "description": "Position for November 2016",
			      "netWorth": {
			        "amount": 516277.47,
			        "currencyCode": "USD"
			      },
			      "totalAsset": {
			        "amount": 581155.45,
			        "currencyCode": "USD"
			      },
			      "totalLiability": {
			        "amount": 64877.98,
			        "currencyCode": "USD"
			      }
			    },
			    {
			      "validDate": "2016-10-01T00:00:00-00:00",
			      "description": "Position for October 2016",
			      "netWorth": {
			        "amount": 508923.66,
			        "currencyCode": "USD"
			      },
			      "totalAsset": {
			        "amount": 564567.88,
			        "currencyCode": "USD"
			      },
			      "totalLiability": {
			        "amount": 55644.22,
			        "currencyCode": "USD"
			      }
			    },
			    {
			      "validDate": "2016-09-01T00:00:00-00:00",
			      "description": "Position for September 2016",
			      "netWorth": {
			        "amount": 502930.4,
			        "currencyCode": "USD"
			      },
			      "totalAsset": {
			        "amount": 562567.89,
			        "currencyCode": "USD"
			      },
			      "totalLiability": {
			        "amount": 59637.49,
			        "currencyCode": "USD"
			      }
			    },
			    {
			      "validDate": "2016-08-01T00:00:00-00:00",
			      "description": "Position for August 2016",
			      "netWorth": {
			        "amount": 472930.4,
			        "currencyCode": "USD"
			      },
			      "totalAsset": {
			        "amount": 522567.85,
			        "currencyCode": "USD"
			      },
			      "totalLiability": {
			        "amount": 49637.45,
			        "currencyCode": "USD"
			      }
			    },
			    {
			      "validDate": "2016-07-01T00:00:00-00:00",
			      "description": "Position for July 2016",
			      "netWorth": {
			        "amount": 473929.57,
			        "currencyCode": "USD"
			      },
			      "totalAsset": {
			        "amount": 523367.22,
			        "currencyCode": "USD"
			      },
			      "totalLiability": {
			        "amount": 49437.65,
			        "currencyCode": "USD"
			      }
			    },
			    {
			      "validDate": "2016-06-01T00:00:00-00:00",
			      "description": "Position for June 2016",
			      "netWorth": {
			        "amount": 460758.73,
			        "currencyCode": "USD"
			      },
			      "totalAsset": {
			        "amount": 520196.35,
			        "currencyCode": "USD"
			      },
			      "totalLiability": {
			        "amount": 59437.62,
			        "currencyCode": "USD"
			      }
			    },
			    {
			      "validDate": "2016-05-01T00:00:00-00:00",
			      "description": "Position for May 2016",
			      "netWorth": {
			        "amount": 456561.42,
			        "currencyCode": "USD"
			      },
			      "totalAsset": {
			        "amount": 518996.87,
			        "currencyCode": "USD"
			      },
			      "totalLiability": {
			        "amount": 62435.45,
			        "currencyCode": "USD"
			      }
			    },
			    {
			      "validDate": "2016-04-01T00:00:00-00:00",
			      "description": "Position for April 2016",
			      "netWorth": {
			        "amount": 446253.83,
			        "currencyCode": "USD"
			      },
			      "totalAsset": {
			        "amount": 512977.48,
			        "currencyCode": "USD"
			      },
			      "totalLiability": {
			        "amount": 66723.65,
			        "currencyCode": "USD"
			      }
			    },
			    {
			      "validDate": "2016-03-01T00:00:00-00:00",
			      "description": "Position for March 2016",
			      "netWorth": {
			        "amount": 445254.16,
			        "currencyCode": "USD"
			      },
			      "totalAsset": {
			        "amount": 479977.48,
			        "currencyCode": "USD"
			      },
			      "totalLiability": {
			        "amount": 34723.32,
			        "currencyCode": "USD"
			      }
			    }
			  ]
			};
