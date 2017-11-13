$(function() {
//	if($('#errorLabel').length){
//		$('#errorLabel').html("");
//		console.log(' clearing errorLabel ');
//	}
	$('#form').submit(function(e) {

		if ($('#msisdn').length) {
			console.log('˜˜˜˜˜˜ msisdn present');
			var myLength = $("#msisdn").val().length;
			console.log('˜˜˜˜˜˜ msisdn = '+myLength);
			if (myLength == 0) {
				$('#errorLabel').html("MSISDN is required");
				return false;
			}
		}
		if ($('#pin').length) {
			console.log('˜˜˜˜˜˜ pin present');
			var myLength = $("#pin").val().length;
			console.log('˜˜˜˜˜˜ pin len = '+myLength);
			if (myLength == 0) {
				$('#errorLabel').html("PIN is required");
				return false;
			}
		}
		if ($('#email').length) {
			console.log('˜˜˜˜˜˜ email present');
			var myLength = $("#email").val().length;
			console.log('˜˜˜˜˜˜ email len = '+myLength);
			if (myLength == 0) {
				$('#errorLabel').html("Email is required");
				return false;
			}
		}
		if ($('#client_id').length) {
			console.log('˜˜˜˜˜˜ client_id present');
			var myLength = $("#client_id").val().length;
			console.log('˜˜˜˜˜˜ client_id len = '+myLength);
			if (myLength == 0) {
				$('#errorLabel').html("Client Key is required");
				return false;
			}
		}
		if ($('#key').length) {
			console.log('˜˜˜˜˜˜ key present');
			var myLength = $("#key").val().length;
			console.log('˜˜˜˜˜˜ key len = '+myLength);
			if (myLength == 0) {
				$('#errorLabel').html("Client Key is required");
				return false;
			}
		}
		if ($('#secret').length) {
			console.log('˜˜˜˜˜˜ secret present');
			var myLength = $("#secret").val().length;
			console.log('˜˜˜˜˜˜ secret len = '+myLength);
			if (myLength == 0) {
				$('#errorLabel').html("Client Secret is required");
				return false;
			}
		}
    });
});