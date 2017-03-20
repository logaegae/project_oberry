/**
 * iamport api
 */
var request = require('request');

/**
 * iamport 관리자 계정 : ungtang@naver.com / good8797##
 */

//DB 연결문
var iamport = {
	validatePayment : function (imp_uid, paymentAmt, callback){
		
		
		request.post(
			{
				url : "https://api.iamport.kr/users/getToken",
				formData :
					{
						imp_key : "4959632228746419",
						imp_secret : "t9ZOVTBqN9kquCGHqq73Rj2Hh1TQl83Ph3EdXfDLoYbTBSA1iH5907Rh9K8uSckafYncd1XCZ8vA15Cj"
					}
					
			},
			function(err,httpResponse,body){
				
				if(err) {
					callback(false);
					return;
				}
				
				var result = JSON.parse(body);
				var access_token = result.response.access_token;

				
				request.get("https://api.iamport.kr/payments/"+imp_uid+"?_token="+access_token,
					function(err,httpResponse,body){
						
						if(err) {
							callback(false);
							return;
						}
						
						var result = JSON.parse(body);
						
						if(result.code != 0) {
							callback(false);
							return;
						}
						
						console.log(result);
						
						var amount = result.response.amount;
						var status = result.response.status;
						
						if(amount == paymentAmt && status == "paid") {
							callback(true);
						} else {
							callback(false);
						}
					
					}
				);
				
				
			
			}
		);
		
	}
}


module.exports = iamport;
