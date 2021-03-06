function dload(file, handler, options)
{
	var d = { client_id: "7zclzcxtiqcxfspf9ltnwztf8kvruwj" };
	var g = queryParams().game;

	if (g)
		d["game"] = g;

	$.ajax({
		url: file,
		type: 'GET',
		data: d,
		success: function(data){
			handler(data);

			if (options.fullheight)
				if ($(window).height() >= $(document).height())
					dload(data._links.next, handler, options);
				else
					options.fullheight = false;
		}
	});
}

function queryParams()
{
	// This function is anonymous, is executed immediately and 
	// the return value is assigned to QueryString!
	var query_string = {};
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		// If first entry with this name
		if (typeof query_string[pair[0]] === "undefined") {
			query_string[pair[0]] = decodeURIComponent(pair[1]);
		// If second entry with this name
		} else if (typeof query_string[pair[0]] === "string") {
			var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
			query_string[pair[0]] = arr;
		// If third or later entry with this name
		} else {
			query_string[pair[0]].push(decodeURIComponent(pair[1]));
		}
	}
	return query_string;
};

function rfc3986Encode (str)
{
	return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
		return '%' + c.charCodeAt(0).toString(16);
	});
}
