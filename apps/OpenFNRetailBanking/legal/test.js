var m = {
	"total" : {
		"amount" : 19969770,
		"currencyCode" : "USD"
	},
	"description" : "Customer Position",
	"customer" : {
		"id" : "C1000",
		"userId" : "asheen",
		"full_name" : "Alice Sheen",
		"short_name" : "Alice",
		"picture" : "",
		"legalAddress" : "",
		"mobilePhoneNumber" : "",
		"email" : "",
		"phoneNumber" : ""
	},
	"bankAccounts" : [ {
		"bank" : {
			"id" : "B1000",
			"full_name" : "Open Financial Network",
			"short_name" : "OpenFN",
			"logo" : "",
			"website" : "",
			"legalAddress" : ""
		},
		"accounts" : [ {
			"lastOverdrawnDate" : "2015-05-05",
			"maturityDate" : "2015-02-01",
			"id" : "SAV1000",
			"number" : "8523654125",
			"type" : "DepositAccount",
			"name" : "OpenFN Advantage Savings",
			"description" : "OpenFN Advantage Savings",
			"label" : "My Savings",
			"balance" : {
				"balanceStartDate" : "2017-02-01T00:00:00-06:00",
				"balanceEndDate" : "2017-03-01T00:00:00-06:00",
				"postedAmount" : {
					"amount" : 10000000,
					"currencyCode" : "USD"
				},
				"availableAmount" : {
					"amount" : 10000000,
					"currencyCode" : "USD"
				}
			},
			"currency" : "USD",
			"accountLifecycleStatus" : "Effective",
			"lastActivityDate" : "2017-01-01",
			"lastStatementDate" : "2017-01-01",
			"customerIdentifier" : "C1000",
			"endDate" : "2015-01-01",
			"startDate" : "2050-01-01"
		}, {
			"lastOverdrawnDate" : "2015-05-05",
			"maturityDate" : "2015-02-01",
			"id" : "CHK1000",
			"number" : "0156785697",
			"type" : "DepositAccount",
			"name" : "OpenFN Advantage Checking",
			"description" : "OpenFN Advantage Checking",
			"label" : "My Chekcing",
			"balance" : {
				"balanceStartDate" : "2017-02-01T00:00:00-06:00",
				"balanceEndDate" : "2017-03-01T00:00:00-06:00",
				"postedAmount" : {
					"amount" : 10000000,
					"currencyCode" : "USD"
				},
				"availableAmount" : {
					"amount" : 10000000,
					"currencyCode" : "USD"
				}
			},
			"currency" : "USD",
			"accountLifecycleStatus" : "Effective",
			"lastActivityDate" : "2017-01-01",
			"lastStatementDate" : "2017-01-01",
			"customerIdentifier" : "C1000",
			"endDate" : "2015-01-01",
			"startDate" : "2050-01-01"
		}, {
			"creditLimit" : {
				"amount" : 50000,
				"currencyCode" : "USD"
			},
			"cashCreditLimit" : {
				"amount" : 400,
				"currencyCode" : "USD"
			},
			"lastPayment" : {
				"amount" : 210.5,
				"currencyCode" : "USD"
			},
			"lastPaymentDate" : "2017-02-01T00:00:00-06:00",
			"minimumPayment" : {
				"amount" : 210.5,
				"currencyCode" : "USD"
			},
			"minimumPaymentDueDate" : "2017-03-01T00:00:00-06:00",
			"payoffBalance" : {
				"amount" : 5230,
				"currencyCode" : "USD"
			},
			"id" : "CC1000",
			"number" : "5869536578541254",
			"type" : "CreditCardAccount",
			"name" : "OpenFN Travel Card",
			"description" : "Open Travel Card",
			"label" : "My Travel Card",
			"balance" : {
				"balanceStartDate" : "2017-02-01T00:00:00-06:00",
				"balanceEndDate" : "2017-03-01T00:00:00-06:00",
				"postedAmount" : {
					"amount" : 5230,
					"currencyCode" : "USD"
				},
				"availableAmount" : {
					"amount" : 44770,
					"currencyCode" : "USD"
				}
			},
			"currency" : "USD",
			"accountLifecycleStatus" : "Effective",
			"lastActivityDate" : "2017-01-01",
			"lastStatementDate" : "2017-01-01",
			"customerIdentifier" : "C1000",
			"endDate" : "2015-01-01",
			"startDate" : "2050-01-01"
		} ]
	}, {
		"bank" : {
			"id" : "B3000",
			"full_name" : "Open Credit Union",
			"short_name" : "OpenUnion",
			"logo" : "",
			"website" : "",
			"legalAddress" : ""
		},
		"accounts" : [ {
			"term" : "30-year",
			"amountBorrowed" : {
				"amount" : 300000,
				"currencyCode" : "USD"
			},
			"payoffBalance" : {
				"amount" : 25000,
				"currencyCode" : "USD"
			},
			"lastPayment" : {
				"amount" : 1000,
				"currencyCode" : "USD"
			},
			"lastPaymentDate" : "2017-02-01T00:00:00-06:00",
			"minimumPayment" : {
				"amount" : 1000,
				"currencyCode" : "USD"
			},
			"minimumPaymentDueDate" : "2017-03-01T00:00:00-06:00",
			"mortgagePurpose" : "Property_Purchase",
			"paymentTotalNumber" : 30,
			"paymentPaidNumber" : 25,
			"marketValueOfCollateral" : {
				"amount" : 290000,
				"currencyCode" : "USD"
			},
			"marketValueOfCollateralDate" : "2017-02-01",
			"requestedBaseLoanAmount" : {
				"amount" : 3000000,
				"currencyCode" : "USD"
			},
			"sourceOfDeposit" : "Savings",
			"repaymentType" : "Amortized",
			"amortizationType" : "Fixed",
			"isRefinance" : false,
			"paymentDelinquentNumber" : 0,
			"paymentInitialDate" : "2015-02-01",
			"paymentPeriod" : "monthly",
			"interestRate" : 3,
			"id" : "M1000",
			"number" : "745896523654125",
			"type" : "MortgageAccount",
			"name" : "OpenFN Advantage Mortgage",
			"description" : "OpenFN Advantage Mortgage",
			"label" : "My Mortgage",
			"balance" : {
				"balanceStartDate" : "2017-02-01T00:00:00-06:00",
				"balanceEndDate" : "2017-03-01T00:00:00-06:00",
				"postedAmount" : {
					"amount" : 5000,
					"currencyCode" : "USD"
				},
				"availableAmount" : {
					"amount" : 0,
					"currencyCode" : "USD"
				}
			},
			"currency" : "USD",
			"accountLifecycleStatus" : "Effective",
			"lastActivityDate" : "2017-01-01",
			"lastStatementDate" : "2017-01-01",
			"customerIdentifier" : "C3000",
			"endDate" : "2015-01-01",
			"startDate" : "2050-01-01",
			"paymentRemaininNumber" : 5
		} ]
	}, {
		"bank" : {
			"id" : "B2000",
			"full_name" : "Open Invest",
			"short_name" : "OpenInvest",
			"logo" : "",
			"website" : "",
			"legalAddress" : ""
		},
		"accounts" : [ {
			"totalMarketValueOfInvestments" : {
				"amount" : 0,
				"currencyCode" : "USD"
			},
			"totalMarketValueOfInvestmentsDate" : "2017-02-01",
			"cashValue" : {
				"amount" : 0,
				"currencyCode" : "USD"
			},
			"amountBorrowed" : {
				"amount" : 0,
				"currencyCode" : "USD"
			},
			"lastDeposit" : {
				"amount" : 0,
				"currencyCode" : "USD"
			},
			"lastDepositDate" : "2017-02-01T00:00:00-06:00",
			"lastWithdraw" : {
				"amount" : 0,
				"currencyCode" : "USD"
			},
			"lastWithdrawDate" : "2017-02-01T00:00:00-06:00",
			"isMarginAccount" : true,
			"investments" : [ {
				"symbol" : "IBM",
				"description" : "IBM",
				"marketValue" : {
					"amount" : 0,
					"currencyCode" : "USD"
				},
				"marketValueDate" : "2017-02-01",
				"assetType" : "stock",
				"quantity" : 1000,
				"price" : {
					"amount" : 0,
					"currencyCode" : "USD"
				},
				"value" : {
					"amount" : 0,
					"currencyCode" : "USD"
				},
				"cost" : {
					"amount" : 0,
					"currencyCode" : "USD"
				},
				"costDate" : "2017-02-01T00:00:00-06:00"
			} ],
			"id" : "I1000",
			"number" : "856987423651235",
			"type" : "InvestmentAccount",
			"name" : "High Investment",
			"description" : "High Investment",
			"label" : "My Investments",
			"balance" : {
				"balanceStartDate" : "2017-02-01T00:00:00-06:00",
				"balanceEndDate" : "2017-03-01T00:00:00-06:00",
				"postedAmount" : {
					"amount" : 10000000,
					"currencyCode" : "USD"
				},
				"availableAmount" : {
					"amount" : 10000000,
					"currencyCode" : "USD"
				}
			},
			"currency" : "USD",
			"accountLifecycleStatus" : "Effective",
			"lastActivityDate" : "2017-01-01",
			"lastStatementDate" : "2017-01-01",
			"customerIdentifier" : "C2000",
			"endDate" : "2015-01-01",
			"startDate" : "2050-01-01"
		} ]
	} ],
	"asset" : {
		"total" : {
			"amount" : 20000000,
			"currencyCode" : "USD"
		},
		"description" : "total assets",
		"allocations" : [ {
			"type" : "cash",
			"amount" : {
				"amount" : 20000000,
				"currencyCode" : "USD"
			},
			"percentage" : 100
		}, {
			"type" : "stock",
			"amount" : {
				"amount" : 0,
				"currencyCode" : "USD"
			},
			"percentage" : 0
		} ]
	},
	"liability" : {
		"total" : {
			"amount" : 30230,
			"currencyCode" : "USD"
		},
		"description" : "total liabilities",
		"allocations" : [ {
			"type" : "creditcard",
			"amount" : {
				"amount" : 5230,
				"currencyCode" : "USD"
			},
			"percentage" : 17.30069467416474
		}, {
			"type" : "mortgage",
			"amount" : {
				"amount" : 25000,
				"currencyCode" : "USD"
			},
			"percentage" : 82.69930532583525
		} ]
	},
	"positionHistory" : [ {
		"validDate" : "2017-02-01T00:00:00-06:00",
		"description" : "Position History Point",
		"netWorth" : {
			"amount" : 0,
			"currencyCode" : "USD"
		},
		"totalAsset" : {
			"amount" : 0,
			"currencyCode" : "USD"
		},
		"totalLiability" : {
			"amount" : 0,
			"currencyCode" : "USD"
		}
	} ],
	"validToDate" : "3/3/2017, 1:21:18 AM",
	"lastUpdatedDate" : "3/2/2017, 6:21:18 PM"
};
var t = {
	"data" : {
		"intents" : [],
		"entities" : [],
		"input" : {},
		"output" : {
			"log_messages" : [],
			"text" : [ "Hi Natalie, how can I help you today?" ],
			"nodes_visited" : [ "node_1_1478122044203", "node_3_1478122398986" ]
		},
		"context" : {
			"person" : {
				"fname" : "Natalie",
				"lname" : "Smith",
				"address" : {
					"line1" : "999 Gateway Dr",
					"line2" : "",
					"city" : "Dallas",
					"state" : "TX",
					"zip" : 888888,
					"country" : "US"
				},
				"customer_id" : 7829706,
				"tone_anger_threshold" : 0.49
			},
			"conversation_id" : "4e9ed05c-e22e-4340-bb7c-8b2e8f2c13b2",
			"system" : {
				"dialog_stack" : [ {
					"dialog_node" : "root"
				} ],
				"dialog_turn_counter" : 1,
				"dialog_request_counter" : 1,
				"_node_output_map" : {
					"node_3_1478122398986" : [ 0, 0, 1 ]
				}
			},
			"defaultCounter" : 0
		}
	},
	"status" : 200,
	"config" : {
		"method" : "POST",
		"transformRequest" : [ null ],
		"transformResponse" : [ null ],
		"url" : "https://gsc-fss-banking-api-p3-watson-prod.mybluemix.net/api/message",
		"headers" : {
			"Accept" : "application/json, text/plain, */*"
		}
	},
	"statusText" : "OK"
};