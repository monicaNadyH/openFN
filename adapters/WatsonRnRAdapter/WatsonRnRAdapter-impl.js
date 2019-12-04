/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/* 
 https://8d290eda-ccda-4ad1-98fa-5a581d09f78b:nsDroqkbf1lC@gateway.watsonplatform.net/retrieve-and-rank/api/v1/solr_clusters/scc7c633bb_398d_4bf9_a395_b3029c9124d9/solr/collection_travelv2/fcselect?ranker_id=A6C822x8-rank-147&q=Which Caribbean island is best destination for a vacation in winter with children?&wt=json&fl=id,locality,city,country,title,description
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
var username = "8d290eda-ccda-4ad1-98fa-5a581d09f78b";
var password = "nsDroqkbf1lC";
	
function getPackages(question) {

	var input = {
		method : 'get',
		returnedContentType : 'json',
		path : "retrieve-and-rank/api/v1/solr_clusters/sc6a7c779b_8035_4e63_a01c_19474613003d/solr/collection_travel/fcselect?ranker_id=42AF7Ex10-rank-177&q="+question+"?&wt=json&fl=id,city,locality,country,title, description"
	};
	
	var obj = WL.Server.invokeHttp(input);
	WL.Logger.warn(obj);
	var response_obj = obj.response;
	//var response_obj = mock_response;
	
	for (var i = 0; i < response_obj.docs.length; i++) {
		
		var locality = response_obj.docs[i].locality;
		var city = response_obj.docs[i].city;
		WL.Logger.warn("locality=" +locality +", city=" + city+" index="+response_obj.docs[i].id);
		
		for (var j = 0; j < packages.length; j++) {
			
			if (locality.toUpperCase().trim() === packages[j].locality
					.toUpperCase().trim()) {

				response_obj.docs[i]["package"] = packages[j];
				break;
			}
		}

		for (var k = 0; k < cities.length; k++) {

			if (city.toUpperCase().trim() === cities[k].city.toUpperCase()
					.trim()) {
				response_obj.docs[i]["cityDetail"] = cities[k];
				break;
			}
		}

	}

	//WL.Logger.warn(response_obj);

	return response_obj;
}


/*var mock_response = {
	"docs" : [
			{
				"city" : "Ocho Rios",
				"country" : "Jamaica",
				"description" : "Dolphin Cove  is a marine attraction in Jamaica  at which guests can swim and interact with dolphins, sharks, and stingrays in their natural environment. \n      Visitors may also interact with other species including iguanas, snakes and a variety of birds as well as other marine creatures in the Jungle Trail Walk. Dolphin Cove has been the recipient of many awards and is considered the NUMBER ONE attraction in Jamaica especially as a destination for family and children. When it opened in 2001, Dolphin Cove, Ocho Rios was the first attraction of its kind in Dolphin Cove. It also has many watersports along with the attraction of swimming with dolphins. The second park opened in Montego Bay in 2005 at the Half Moon Resort and is reserved for guests of the resort. The third facility at Lucea opened during 2010.\nThe company operates three facilities on the island: Ocho Rios, Montego Bay, and Lucea, which is claimed to be the largest natural dolphin lagoon in the world.",
				"id" : "1",
				"locality" : "Temp1",
				"title" : "Dolphin Cove is a phenomenal destination for tourists especially with families and children that offers the opportunity to swim with dolphins in their natural surroundings. "

			},
			{
				"city" : "Ocho Rios",
				"country" : "Jamaica",
				"description" : "Dolphin Cove  is a marine attraction in Jamaica  at which guests can swim and interact with dolphins, sharks, and stingrays in their natural environment. \n      Visitors may also interact with other species including iguanas, snakes and a variety of birds as well as other marine creatures in the Jungle Trail Walk. Dolphin Cove has been the recipient of many awards and is considered the NUMBER ONE attraction in Jamaica especially as a destination for family and children. When it opened in 2001, Dolphin Cove, Ocho Rios was the first attraction of its kind in Dolphin Cove. It also has many watersports along with the attraction of swimming with dolphins. The second park opened in Montego Bay in 2005 at the Half Moon Resort and is reserved for guests of the resort. The third facility at Lucea opened during 2010.\nThe company operates three facilities on the island: Ocho Rios, Montego Bay, and Lucea, which is claimed to be the largest natural dolphin lagoon in the world.",
				"id" : "1",
				"locality" : "Dolphin Cove",
				"title" : "Dolphin Cove is a phenomenal destination for tourists especially with families and children that offers the opportunity to swim with dolphins in their natural surroundings. "

			},
			{
				"city" : "Grand Cayman island",
				"country" : "Cayman Islands",
				"description" : "Seven Mile Beach (SMB) is a long crescent of coral-sand beach on the western end of Grand Cayman island. Seven Mile Beach is known for its beauty, recently receiving the honor of 'The Caribbean's Best Beach' from Caribbean Travel and Life Magazine. It is public property (as are all beaches in the Cayman Islands) and one is able to walk the full length of the beach, regardless of where you are staying. The Seven Mile Beach is the most popular and most developed area of Grand Cayman. It is home to the majority of the island's luxury resorts and hotels. Despite the name, a generous measurement puts the actual length at just a bit over 6.3 miles (10.1 km) long. A realistic length for the uninterrupted sandy beach is about 6 miles.",
				"id" : "10",
				"locality" : "Seven Mile Beach",
				"title" : "Seven Mile Beach is the most well known beach in all of Cayman Island. As its name implies, the soft, white sand stretches for miles."

			},
			{
				"city" : "Saint Lawrence Gap",
				"country" : "Barbados",
				"description" : "Saint Lawrence Gap, Christ Church is one of the best known neighborhoods in the country of Barbados. Sometimes just called 'The Gap', Saint Lawrence Gap is located on the southern coast of Barbados along the islands. Found between Oistins to the east and Worthings to the west, Saint Lawrence Gap features a 1.5k kilometer stretch of bars, hotels, dance clubs, restaurants, inns, resorts, and shops along a white powdery-sand beachfront. It is situated roughly 5 km southeast of the capital city Bridgetown. Some of the attractions are: The Cove (formerly Reggae Lounge), Old Jamm Inn and the Sugar Ultra Lounge.",
				"id" : "50",
				"locality" : "The Gap",
				"title" : "Nightlife and Entertainment in Barbados starts in  the St.Lawrence Gap. A stroll through The Gap reveals a number of nightclubs, catering to all musical tastes."

			},
			{
				"city" : "Cayman Brac",
				"country" : "Cayman Islands",
				"description" : "The MV Captain Keith Tibbetts was sunk in 1996 as an artificial reef. Since then, coral has grown on the wreck. The wreck has since had its back broken by a Winter Nor'Wester storm which has resulted in a debris field amidships. It remains an interesting wreck with plenty to see on the outside, plus there's a couple of well-known and reasonably safe penetration opportunities. Fish life is present and is typical for the region, with local DMs often aware of where a resident Scorpionfish or two are residing. The area off the bow of the ship leads out into a deeper sandflat area, and then coral formations at the wall dropoff. This area is not frequented by most divers who come to this mooring, partly because it isn't the wreck proper, but also because the dropoff starts deep, in approximately 110fsw. As with any bluewater dropoff, pelagics can occasionally be spotted in this area",
				"id" : "28",
				"locality" : "MV Captain Keith Tibbetts",
				"title" : "The MV Keith Tibbetts is an artificial reef which rests on the northern shores of Cayman Brac. "

			},
			{
				"city" : "Cayman Brac",
				"country" : "Cayman Islands",
				"description" : "The Bluff is a low plateau of karstic limestone, gently rising towards the eastern end of the island. It stands at the eastern end of the island of Cayman Brac and has a maximum elevation of 43 m. Much of it supports a diverse dry forest, the forest has a long history of logging and is a mosaic of old growth and second growth trees. Some 473 ha have been identified by BirdLife International as the Bluff Forest Important Bird Area (IBA) because it supports significant populations of white-crowned pigeons, Cuban amazons, Caribbean elaenias, thick-billed vireos and vitelline warblers. The IBA encompasses the 82 ha National Trust€™s Brac Parrot Reserve which protects mature and standing dead trees as nesting habitat for the Cuban amazon parrots.",
				"id" : "27",
				"locality" : "The Bluff",
				"title" : "The Bluff is the highest part of the Cayman Islands, a British Overseas Territory in the Caribbean Sea."

			},
			{
				"city" : "Little Cayman",
				"country" : "Cayman Islands",
				"description" : "Little Cayman's Booby Pond Nature Reserve supports the largest red-footed booby population in the Caribbean and is a designated Ramsar wetland of international importance. The site encompasses 82 hectares (200 acres). The Cayman Islands National Trust building on one edge of the pond offers viewing decks with telescopes, and the building itself is open for a couple of hours on weekday afternoons. It also contains exhibits about Little Cayman's flora and fauna, a library and a small selection of gifts.",
				"id" : "23",
				"locality" : "Booby Pond Nature Reserve",
				"title" : "Booby Pond Nature Reserve is a protected wetland on Little Cayman, one of the Cayman Islands, a British Overseas Territory in the Caribbean Sea."

			},
			{
				"city" : "Ocho Rios",
				"country" : "Jamaica",
				"description" : "Dunn's River Falls is one of the attractions that Ocho Rios is best known for. At about 180 feet (55 m) high and 600 feet (180 m) long, the waterfalls are terraced like giant natural stairs though some incorporate man-made improvements. Several small lagoons are interspersed among the vertical sections of the falls. The falls empty into the Caribbean Sea at the western end of an attractive white-sand beach.\nClimbing the waterfalls is a popular tourist activity and is often, but not exclusively, performed with the help of tour guides from the park. It takes about 1-1.5 hours to climb with short breaks for photographs and video recordings taken by the guides. There are also stairs, alongside of the falls, for those who do not want to get wet or are unable to manage the rocky, uneven terrain of the actual waterfall. ",
				"id" : "2",
				"locality" : "Dunn's River Falls and Park",
				"title" : "Dunn's River Falls is a famous waterfall near Ocho Rios, Jamaica and a major Caribbean tourist attraction that receives thousands of visitors especially families each year."

			},
			{
				"city" : "Montego Bay",
				"country" : "Jamaica",
				"description" : "Aquasol Theme Park is a large amusement park on the ocean at Montego Bay, located at the Walter Fletcher Beach Complex just a short walk from downtown Montego Bay. With go-kart racing, watersports and a white-sand beach, this is the perfect destination for families with young kids. Watersports are popular at the Aquasol Theme Park. Paddling around the calm beach waters on a banana boat. Renting snorkeling gear or a glass-bottom boat for a view of the marine life, including lionfish and colorful coral, just below the surface. Jet skiing, wave-running and parasailing are all available for the more adventurous visitor. ",
				"id" : "9",
				"locality" : "Aquasol Theme Park",
				"title" : "Watersports, go-kart racing and a white-sand beach make this oceanfront theme park an ideal spot for families."

			},
			{
				"city" : "Batts Rock",
				"country" : "Barbados",
				"description" : "Batts Rock is a designated Public Beach area and has picnic benches, shower and changing facilities, drinks machine, and a small children's playground with slides, swings, and see-saws. The sea here is calm and excellent for swimming while the crystal-clear waters and small rocky areas also make it an interesting snorkeling location. Among the trees that line the shore one can see the ruins of what was, many years ago, a popular beachfront dancing spot.",
				"id" : "41",
				"locality" : "Batts Rock Beach",
				"title" : "Batts Rock is located on the west coast of Barbados just a few minutes from the capital city of Bridgetown."

			},
			{
				"city" : "Port Antonio",
				"country" : "Jamaica",
				"description" : "The Beach is located in the somewhat faded tourist town of Port Antonio of Jamaica. The beach is frequently by locals and tourists alike and is great for watersports and as a quiet place.",
				"id" : "63",
				"locality" : "Boston Bay Beach",
				"title" : "Boston Bay Beach is known for having some of the best jerk stands and surfing in the country."

			} ]
};*/


var mock_response = {"docs": [{
	"id": "1",
	"title": "Dolphin Cove is a phenomenal destination for tourists especially with families and children that offers the opportunity to swim with dolphins in their natural surroundings. ",
	"description": "Dolphin Cove  is a marine attraction in Jamaica  at which guests can swim and interact with dolphins, sharks, and stingrays in their natural environment. \n      Visitors may also interact with other species including iguanas, snakes and a variety of birds as well as other marine creatures in the Jungle Trail Walk. Dolphin Cove has been the recipient of many awards and is considered the NUMBER ONE attraction in Jamaica especially as a destination for family and children. When it opened in 2001, Dolphin Cove, Ocho Rios was the first attraction of its kind in Dolphin Cove. It also has many watersports along with the attraction of swimming with dolphins. The second park opened in Montego Bay in 2005 at the Half Moon Resort and is reserved for guests of the resort. The third facility at Lucea opened during 2010.\nThe company operates three facilities on the island: Ocho Rios, Montego Bay, and Lucea, which is claimed to be the largest natural dolphin lagoon in the world.",
	"city": "Ocho Rios",
	"country": "Jamaica",
	"locality": "Dolphin Cove "
}, {
	"id": "10",
	"description": "Seven Mile Beach (SMB) is a long crescent of coral-sand beach on the western end of Grand Cayman island. Seven Mile Beach is known for its beauty, recently receiving the honor of 'The Caribbean's Best Beach' from Caribbean Travel and Life Magazine. It is public property (as are all beaches in the Cayman Islands) and one is able to walk the full length of the beach, regardless of where you are staying. The Seven Mile Beach is the most popular and most developed area of Grand Cayman. It is home to the majority of the island's luxury resorts and hotels. Despite the name, a generous measurement puts the actual length at just a bit over 6.3 miles (10.1 km) long. A realistic length for the uninterrupted sandy beach is about 6 miles.",
	"title": "Seven Mile Beach is the most well known beach in all of Cayman Island. As its name implies, the soft, white sand stretches for miles.",
	"city": "Grand Cayman Island",
	"country": "Cayman Islands",
	"locality": "Seven Mile Beach"
}, {
	"id": "50",
	"description": "Saint Lawrence Gap, Christ Church is one of the best known neighborhoods in the country of Barbados. Sometimes just called 'The Gap', Saint Lawrence Gap is located on the southern coast of Barbados along the islands. Found between Oistins to the east and Worthings to the west, Saint Lawrence Gap features a 1.5k kilometer stretch of bars, hotels, dance clubs, restaurants, inns, resorts, and shops along a white powdery-sand beachfront. It is situated roughly 5 km southeast of the capital city Bridgetown. Some of the attractions are: The Cove (formerly Reggae Lounge), Old Jamm Inn and the Sugar Ultra Lounge.",
	"title": "Nightlife and Entertainment in Barbados starts in  the St.Lawrence Gap. A stroll through The Gap reveals a number of nightclubs, catering to all musical tastes.",
	"city": "Saint Lawrence Gap",
	"country": "Barbados",
	"locality": "The Gap"
}, {
	"id": "28",
	"description": "The MV Captain Keith Tibbetts was sunk in 1996 as an artificial reef. Since then, coral has grown on the wreck. The wreck has since had its back broken by a Winter Nor'Wester storm which has resulted in a debris field amidships. It remains an interesting wreck with plenty to see on the outside, plus there's a couple of well-known and reasonably safe penetration opportunities. Fish life is present and is typical for the region, with local DMs often aware of where a resident Scorpionfish or two are residing. The area off the bow of the ship leads out into a deeper sandflat area, and then coral formations at the wall dropoff. This area is not frequented by most divers who come to this mooring, partly because it isn't the wreck proper, but also because the dropoff starts deep, in approximately 110fsw. As with any bluewater dropoff, pelagics can occasionally be spotted in this area",
	"title": "The MV Keith Tibbetts is an artificial reef which rests on the northern shores of Cayman Brac. ",
	"city": "Cayman Brac",
	"country": "Cayman Islands",
	"locality": "MV Captain Keith Tibbetts"
}, {
	"id": "27",
	"description": "The Bluff is a low plateau of karstic limestone, gently rising towards the eastern end of the island. It stands at the eastern end of the island of Cayman Brac and has a maximum elevation of 43 m. Much of it supports a diverse dry forest, the forest has a long history of logging and is a mosaic of old growth and second growth trees. Some 473 ha have been identified by BirdLife International as the Bluff Forest Important Bird Area (IBA) because it supports significant populations of white-crowned pigeons, Cuban amazons, Caribbean elaenias, thick-billed vireos and vitelline warblers. The IBA encompasses the 82 ha National Trust’s Brac Parrot Reserve which protects mature and standing dead trees as nesting habitat for the Cuban amazon parrots.",
	"title": "The Bluff is the highest part of the Cayman Islands, a British Overseas Territory in the Caribbean Sea.",
	"city": "Cayman Brac",
	"country": "Cayman Islands",
	"locality": "The Bluff"
}, {
	"id": "23",
	"description": "Little Cayman's Booby Pond Nature Reserve supports the largest red-footed booby population in the Caribbean and is a designated Ramsar wetland of international importance. The site encompasses 82 hectares (200 acres). The Cayman Islands National Trust building on one edge of the pond offers viewing decks with telescopes, and the building itself is open for a couple of hours on weekday afternoons. It also contains exhibits about Little Cayman's flora and fauna, a library and a small selection of gifts.",
	"title": "Booby Pond Nature Reserve is a protected wetland on Little Cayman, one of the Cayman Islands, a British Overseas Territory in the Caribbean Sea.",
	"city": "Little Cayman",
	"country": "Cayman Islands",
	"locality": "Booby Pond Nature Reserve\n"
}, {
	"id": "2",
	"description": "Dunn's River Falls is one of the attractions that Ocho Rios is best known for. At about 180 feet (55 m) high and 600 feet (180 m) long, the waterfalls are terraced like giant natural stairs though some incorporate man-made improvements. Several small lagoons are interspersed among the vertical sections of the falls. The falls empty into the Caribbean Sea at the western end of an attractive white-sand beach.\nClimbing the waterfalls is a popular tourist activity and is often, but not exclusively, performed with the help of tour guides from the park. It takes about 1-1.5 hours to climb with short breaks for photographs and video recordings taken by the guides. There are also stairs, alongside of the falls, for those who do not want to get wet or are unable to manage the rocky, uneven terrain of the actual waterfall. ",
	"title": "Dunn's River Falls is a famous waterfall near Ocho Rios, Jamaica and a major Caribbean tourist attraction that receives thousands of visitors especially families each year.",
	"city": "Ocho Rios",
	"country": "Jamaica",
	"locality": "Dunn's River Falls and Park"
}, {
	"id": "9",
	"description": "Aquasol Theme Park is a large amusement park on the ocean at Montego Bay, located at the Walter Fletcher Beach Complex just a short walk from downtown Montego Bay. With go-kart racing, watersports and a white-sand beach, this is the perfect destination for families with young kids. Watersports are popular at the Aquasol Theme Park. Paddling around the calm beach waters on a banana boat. Renting snorkeling gear or a glass-bottom boat for a view of the marine life, including lionfish and colorful coral, just below the surface. Jet skiing, wave-running and parasailing are all available for the more adventurous visitor. ",
	"title": "Watersports, go-kart racing and a white-sand beach make this oceanfront theme park an ideal spot for families.",
	"city": "Montego Bay",
	"country": "Jamaica",
	"locality": "Aquasol Theme Park"
}, {
	"id": "41",
	"description": "Batts Rock is a designated Public Beach area and has picnic benches, shower and changing facilities, drinks machine, and a small children's playground with slides, swings, and see-saws. The sea here is calm and excellent for swimming while the crystal-clear waters and small rocky areas also make it an interesting snorkeling location. Among the trees that line the shore one can see the ruins of what was, many years ago, a popular beachfront dancing spot.",
	"title": "Batts Rock is located on the west coast of Barbados just a few minutes from the capital city of Bridgetown.",
	"city": "Batts Rock",
	"country": "Barbados",
	"locality": "Batts Rock Beach"
}, {
	"id": "63",
	"description": "The Beach is located in the somewhat faded tourist town of Port Antonio of Jamaica. The beach is frequently by locals and tourists alike and is great for watersports and as a quiet place.",
	"title": "Boston Bay Beach is known for having some of the best jerk stands and surfing in the country.",
	"city": "Port Antonio",
	"country": "Jamaica",
	"locality": "Boston Bay Beach"
}]};

var packages = [
                {
                    "packageId" : 1,
                    "packageDescription" :"Exclusive Dolphin Adventure Package at the Dolphin Cove",
                    "cost" : 1200,     
                    "detail": "4 days, 3 nights",
                    "rating":5,
                    "numReviews":500,
                    "imageId": "1",
                    "locality": "Dolphin Cove "
                  },


                 {
                  
                    "packageId" : 2,
                    "packageDescription" :"Adventure package at the Dunn's River Falls",
                    "cost" : 1000,     
                    "detail": "4 days, 3 nights",
                    "rating":4,
                    "numReviews":401,
                    "imageId": "2",
                    "locality": "Dunn's River Falls and Park"
                  
                },
                 {
                  
                    "packageId" : 3,
                    "packageDescription" :"Family Day out package at the James Bond Beach",
                    "cost" : 1100,     
                    "detail": "4 days, 3 nights",
                    "rating":4,
                    "numReviews":422,
                    "imageId": "3",
                    "locality": "James Bond Beach"
                  
                },
                 {
                  
                    "packageId" : 4,
                    "packageDescription" :"Regional Tour of Negril",
                    "cost" : 900,     
                    "detail": "4 days, 3 nights",
                    "rating":3,
                    "numReviews":443,
                    "imageId": "4",
                    "locality": "Negril Lighthouse"
                },
                  {
                    "packageId" : 5,
                    "packageDescription" :"Best Cuisine tour at Negril",
                    "cost" : 700,     
                    "detail": "4 days, 3 nights",
                    "rating":2,
                    "numReviews":304,
                    "imageId": "4",
                    "locality": "Rick’s Cafe" 
                },
                  {
                    "packageId" : 6,
                    "packageDescription" :"Exclusive Couple package at the Booby Cay Island",
                    "cost" : 800,     
                    "detail": "4 days, 3 nights",
                    "rating":5,
                    "numReviews":405,
                    "imageId": "5",
                    "locality": "Booby Cay Island"
                },
                   {
                    "packageId" : 7,
                    "packageDescription" :"All Inclusive Package for the Mayfield Falls",
                    "cost" : 700,     
                    "detail": "4 days, 3 nights",
                    "rating":2,
                    "numReviews":205,
                    "imageId": "2",
                    "locality": "Mayfield Falls"
                },
                   {
                    "packageId" :8,
                    "packageDescription" :"Exclusive Package to Jamaica's Best  beach",
                    "cost" : 1500,     
                    "detail": "4 days, 3 nights",
                    "rating":3,
                    "numReviews":106,
                    "imageId": "6",
                    "locality": "Doctor's Cave Beach Club"
                },
                   {
                    "packageId" : 9,
                    "packageDescription" :"Exclusive Family package to the best theme park.",
                    "cost" : 1600,     
                    "detail": "4 days, 3 nights",
                    "rating":5,
                    "numReviews":403,
                    "imageId": "7",
                    "locality": "Aquasol Theme Park"
                },
                 {    
                    "packageId" : 10,
                    "packageDescription" :"All Inclusive package to the Caribbean's Best Beach",
                    "cost" : 1700,     
                    "detail": "4 days, 3 nights",
                    "rating":5,
                    "numReviews":254,
                    "imageId": "19",
                    "locality": "Seven Mile Beach"
                },
                 {
                    "packageId" : 11,
                    "packageDescription" :"Exclusive Stingray Adventure Package for Families",
                    "cost" : 1500,     
                    "detail": "4 days, 3 nights",
                    "rating":4,
                    "numReviews":335,
                    "imageId": "8",
                    "locality": "Stingray City"
                },
                 {
                    "packageId" : 12,
                    "packageDescription" :"All inclusive tour package at the Cayman Islands capital",
                    "cost" : 1300,     
                    "detail": "4 days, 3 nights",
                    "rating":4,
                    "numReviews":203,
                    "imageId": "4",
                    "locality": "George Town"
                },
                 {
                    "packageId" : 13,
                    "packageDescription" :"Historic Tour Package at Bridgetown",
                    "cost" : 1400,     
                    "detail": "4 days, 3 nights",
                    "rating":2,
                    "numReviews":102,
                    "imageId": "4",
                    "locality": "National Heroes Square" 
                },
                 {
                    "packageId" : 14,
                    "packageDescription" :"All Inclusive Historical Package",
                    "cost" : 1600,     
                    "detail": "4 days, 3 nights",
                    "rating":3,
                    "numReviews":301,
                    "imageId": "4",
                    "locality": "St Nicholas Abbey"
                },
                 {
                    "id" : 15,
                    "packageDescription" :"Exclusive Underwater exploration Package",
                    "cost" : 1700,     
                    "detail": "4 days, 3 nights",
                    "rating":3,
                    "numReviews":336,
                    "imageId": "9",
                    "locality": "Stavronikita"  
                },
                 {
                    "packageId" : 16,
                    "packageDescription" :"All Inclusive Educational Tour Package",
                    "cost" : 1800,     
                    "detail": "4 days, 3 nights",
                    "rating":4,
                    "numReviews":302,
                    "imageId": "4",
                    "locality": "Bob Marley Museum" 
                },
                 {
                    "packageId" : 17,
                    "packageDescription" :"Exclusive Family Educational Tour Package",
                    "cost" : 1900,     
                    "detail": "4 days, 3 nights",
                    "rating":4,
                    "numReviews":201,
                    "imageId": "4",
                    "locality": "National Heroes Park"
                },
                 {
                    "packageId" : 18,
                    "packageDescription" :"All Inclusive Cultural Tour Package",
                    "cost" : 1100,     
                    "detail": "4 days, 3 nights",
                    "rating":3,
                    "numReviews":306,
                    "imageId": "4",
                    "locality": "Devon House"
                },
                 {
                    "packageId" : 19,
                    "packageDescription" :"Exclusive Family package for a garden & wildlife facility",
                    "cost" : 1300,     
                    "detail": "4 days, 3 nights",
                    "rating":3,
                    "numReviews":111,
                    "imageId": "4",
                    "locality": "Queen Elizabeth II Botanic Park"
                },
                 {
                    "packageId" : 20,
                    "packageDescription" :"Exclusive Educational Tour Package for families",
                    "cost" : 1400,     
                    "detail": "4 days, 3 nights",
                    "rating":4,
                    "numReviews":303,
                    "imageId": "21",
                    "locality": "Cayman Islands National Museum"
                },
                 {
                    "packageId" : 21,
                    "packageDescription" :"All Inclusive Swimming Package at the Point of Sand",
                    "cost" : 1300,     
                    "detail": "4 days, 3 nights",
                    "rating":4,
                    "numReviews":307,
                    "imageId": "6",
                    "locality": "Point of Sand"
                },
                 {
                    "packageId" : 22,
                    "packageDescription" :"Exclusive Educational Tour Package for families",
                    "cost" : 1100,     
                    "detail": "4 days, 3 nights",
                    "rating":3,
                    "numReviews":204,
                    "imageId": "4",
                    "locality": "Little Cayman Research center"
                },
                 {
                    "packageId" : 23,
                    "packageDescription" :"Exclusive Family package for a wildlife facility",
                    "cost" : 1110,     
                    "detail": "4 days, 3 nights",
                    "rating":4,
                    "numReviews":201,
                    "imageId": "4",
                    "locality": "Booby Pond Nature Reserve"
                },
                 {
                    "packageId" : 24,
                    "packageDescription" :"Exclusive Couple Package for an island getaway.",
                    "cost" : 1230,     
                    "detail": "4 days, 3 nights",
                    "rating":3,
                    "numReviews":234,
                    "imageId": "10",
                    "locality": "Owen Island"
                },
                 {
                    "packageId" : 25,
                    "packageDescription" :"Exclusive Underwater exploration Package",
                    "cost" : 1330,     
                    "detail": "4 days, 3 nights",
                    "rating":4,
                    "numReviews":261,
                    "imageId": "9",
                    "locality": "Kissime Wreck"
                },
                 {
                    "packageId" : 26,
                    "packageDescription" :"Exclusive Educational Tour Package for families",
                    "cost" : 1440,     
                    "detail": "4 days, 3 nights",
                    "rating":3,
                    "numReviews":273,
                    "imageId": "4",
                    "locality": "Cayman Brac Museum"
                },
                 {
                    "packageId" : 27,
                    "packageDescription" :"Family Exclusive adventure & Birding Package at the Bluff",
                    "cost" : 1560,     
                    "detail": "4 days, 3 nights",
                    "rating":3,
                    "numReviews":364,
                    "imageId": "11",
                    "locality": "The Bluff"
                },
                 {
                    "packageId" : 28,
                    "packageDescription" :"Exclusive Underwater exploration Package",
                    "cost" : 1770,     
                    "detail": "4 days, 3 nights",
                    "rating":4,
                    "numReviews":291,
                    "imageId": "9",
                    "locality": "MV Captain Keith Tibbetts"
                },
                 {
                    "packageId" : 29,
                    "packageDescription" :"Exclusive Historical Tour Package for families",
                    "cost" : 1880,     
                    "detail": "4 days, 3 nights",
                    "rating":4,
                    "numReviews":326,
                    "imageId": "12",
                    "locality": "Rebecca’s Cave"
                },
                 {
                    "packageId" : 30,
                    "packageDescription" :"Exclusive Underwater exploration Package",
                    "cost" : 1330,     
                    "detail": "4 days, 3 nights",
                    "rating":3,
                    "numReviews":276,
                    "imageId": "9",
                    "locality": "Friars Crag"
                },
                 {
                    "packageId" : 31,
                    "packageDescription" :"Romantic package at the South Coast of Barbados",
                    "cost" : 1220,     
                    "detail": "4 days, 3 nights",
                    "rating":3,
                    "numReviews":302,
                    "imageId": "20",
                    "locality": "Carlisle Bay" 
                },


                 {
                    "packageId" : 32,
                    "packageDescription" :"Exclusive Underwater exploration Package",
                    "cost" : 1210,     
                    "detail": "4 days, 3 nights",
                    "rating":1,
                    "numReviews":401,
                    "imageId": "9",
                    "locality": "Pamir"
                },
                 {
                    "packageId" : 33,
                    "packageDescription" :"Exclusive adventure & exploration Package",
                    "cost" : 1222,     
                    "detail": " 4 days, 3 nights",
                    "rating":2,
                    "numReviews":200,
                    "imageId": "12",
                    "locality": "Harrison's Cave"
                },
                 {
                    "packageId" : 34,
                    "packageDescription" :"Exclusive Historical Tour Package for families",
                    "cost" : 1254,     
                    "detail": "4 days, 3 nights",
                    "rating":2,
                    "numReviews":306,
                    "imageId": "4",
                    "locality": "George Washington House"
                },
                 {
                    "packageId" : 35,
                    "packageDescription" :"Exclusive adventure & exploration Package",
                    "cost" : 1677,     
                    "detail": "4 days, 3 nights",
                    "rating":3,
                    "numReviews":209,
                    "imageId": "9",
                    "locality": "Animal Flower Cave"
                },
                 {
                    "packageId" : 36,
                    "packageDescription" :"Romantic package at the South Coast of Barbados",
                    "cost" : 1755,     
                    "detail": "2 days, 1 nights",
                    "rating":2,
                    "numReviews":302,
                    "imageId": "3",
                    "locality": "Miami Beach"
                },
                 {
                    "packageId" : 37,
                    "packageDescription" :"Romantic package at the North Coast of Barbados",
                    "cost" : 1544,     
                    "detail": "4 days, 3 nights",
                    "rating":3,
                    "numReviews":207,
                    "imageId": "13",
                    "locality": "Bottom Bay"
                },
                 {
                    "packageId" : 38,
                    "packageDescription" :"Package at the South Coast of Barbados exclusively for couples",
                    "cost" : 1433,     
                    "detail": "4 days, 3 nights",
                    "rating":3,
                    "numReviews":101,
                    "imageId": "14",
                    "locality": "Crane Beach"
                },
                 {
                    "packageId" : 39,
                    "packageDescription" :"Exclusive Historical Tour Package for families",
                    "cost" : 1622,     
                    "detail": "4 days, 3 nights",
                    "rating":5,
                    "numReviews":301,
                    "imageId": "4",
                    "locality": "Sam Lord's Castle"
                },
                 {
                    "packageId" : 40,
                    "packageDescription" :"Romantic package at the West Coast of Barbados exclusively for couples",
                    "cost" : 1233,     
                    "detail": "4 days, 3 nights",
                    "rating":2,
                    "numReviews":407,
                    "imageId": "16",
                    "locality": "Alleynes Bay"
                },
                 {
                    "packageId" : 41,
                    "packageDescription" :"All Inclusive package at the West Coast of Barbados",
                    "cost" : 1211,     
                    "detail": "4 days, 3 nights",
                    "rating":2,
                    "numReviews":108,
                    "imageId": "6",
                    "locality": "Batts Rock Beach"
                },
                 {
                    "packageId" : 42,
                    "packageDescription" :"Romantic package at the West Coast of Barbados exclusively for couples",
                    "cost" : 1888,     
                    "detail": "4 days, 3 nights",
                    "rating":3,
                    "numReviews":115,
                    "imageId": "14",
                    "locality": "Brighton Beach"
                },
                 {
                    "packageId" : 43,
                    "packageDescription" :"Romantic package at the West Coast of Barbados exclusively for couples",
                    "cost" : 1755,     
                    "detail": "4 days, 3 nights",
                    "rating":4,
                    "numReviews":303,
                    "imageId": "6",
                    "locality": "Brownes Beach"
                },
                 {
                    "packageId" : 44,
                    "packageDescription" :"Romantic package at the West Coast of Barbados exclusively for couples",
                    "cost" : 1333,     
                    "detail": "4 days, 3 nights",
                    "rating":3,
                    "numReviews":206,
                    "imageId": "15",
                    "locality": "Colony Club Beach"
                },
                 {
                    "packageId" : 45,
                    "packageDescription" :"Romantic package at the West Coast of Barbados",
                    "cost" : 1222,     
                    "detail": "4 days, 3 nights",
                    "rating":2,
                    "numReviews":202,
                    "imageId": "16",
                    "locality": "Freshwater Bay"
                },
                 {
                    "packageId" : 46,
                    "packageDescription" :"Exclusive package at the West Coast of Barbados",
                    "cost" : 1111,     
                    "detail": "4 days, 3 nights",
                    "rating":2,
                    "numReviews":301,
                    "imageId": "15",
                    "locality": "Gibbes beach"
                },
                 {
                    "packageId" : 47,
                    "packageDescription" :"Romantic package at the West Coast of Barbados",
                    "cost" : 1122,     
                    "detail": "4 days, 3 nights",
                    "rating":2,
                    "numReviews":407,
                    "imageId": "14",
                    "locality": "Mullins beach"
                },
                 {
                    "packageId" : 48,
                    "packageDescription" :"Romantic package at the West Coast of Barbados",
                    "cost" : 1555,     
                    "detail": "4 days, 3 nights",
                    "rating":2,
                    "numReviews":309,
                    "imageId": "15",
                    "locality": "Paradise Beach"
                },
                
                 {
                    "packageId" : 49,
                    "packageDescription" :"Exclusive package at the West Coast of Barbados for couples",
                    "cost" : 1888,     
                    "detail": "4 days, 3 nights",
                    "rating":2,
                    "numReviews":203,
                    "imageId": "22",
                    "locality": "Six Men's Bay"
                },
                 {
                  "packageId" : 50,
                    "packageDescription" :"All Inclusive Nightlife and Entertainment Package",
                    "cost" : 1550,     
                    "detail": "4 days, 3 nights",
                    "rating":5,
                    "numReviews":401,
                    "imageId": "11",
                    "locality": "The Gap"
                },
                 {
                    "packageId" : 51,
                    "packageDescription" :"Romantic package at the South Coast of Barbados exclusively for couples",
                    "cost" : 1333,     
                    "detail": "4 days, 3 nights",
                    "rating":3,
                    "numReviews":301,
                    "imageId": "15",
                    "locality": "Harrismith Beach"
                },
                 {
                    "packageId" : 52,
                    "packageDescription" :"Romantic package at the South Coast of Barbados exclusively for couples",
                    "cost" : 1233,     
                    "detail": "4 days, 3 nights",
                    "rating":3,
                    "numReviews":409,
                    "imageId": "19",
                    "locality": "Golden Sands Beach"
                },
                 {
                    "packageId" : 53,
                    "packageDescription" :"Romantic package at the East Coast of Barbados exclusively for couples",
                    "cost" : 1211,     
                    "detail": "4 days, 3 nights",
                    "rating":3,
                    "numReviews":402,
                    "imageId": "3",
                    "locality": "Bathsheba"
                },
                 {
                    "packageId" : 54,
                    "packageDescription" :"Romantic package at the East Coast of Barbados exclusively for couples",
                    "cost" : 1222,     
                    "detail": "4 days, 3 nights",
                    "rating":4,
                    "numReviews":332,
                    "imageId": "16",
                    "locality": "Martin's Bay"
                },
                 {
                    "packageId" : 55,
                    "packageDescription" :"Exclusive package at the East Coast of Barbados for couples",
                    "cost" : 1233,     
                    "detail": "4 days, 3 nights",
                    "rating":4,
                    "numReviews":411,
                    "imageId": "22",
                    "locality": "Morgan Lewis Beach"
                },
                 {
                    "packageId" : 56,
                    "packageDescription" :"Adventure package at the East Coast of Barbados exclusively for couples",
                    "cost" : 1244,     
                    "detail": "4 days, 3 nights",
                    "rating":3,
                    "numReviews":211,
                    "imageId": "20",
                    "locality": "Ragged Point"
                },
                 {
                    "packageId" : 57,
                    "packageDescription" :"Adventure package at the North Coast of Barbados exclusively for couples",
                    "cost" : 1255,     
                    "detail": "4 days, 3 nights",
                    "rating":2,
                    "numReviews":101,
                    "imageId": "20",
                    "locality": "Goat House Bay"
                },
                 {
                    "packageId" : 58,
                    "packageDescription" :"Exclusive package at the North Coast of Barbados for couples",
                    "cost" : 1244,     
                    "detail": "4 days, 3 nights",
                    "rating":2,
                    "numReviews":342,
                    "imageId": "22",
                    "locality": "Maycocks Bay"
                },
                 {
                  
                    "packageId" : 59,
                    "packageDescription" :"Adventure package at the North Coast of Barbados exclusively for couples",
                    "cost" : 1233,     
                    "detail": "4 days, 3 nights",
                    "rating":4,
                    "numReviews":206,
                    "imageId": "20",
                    "locality": "River Bay"  },
                 {
                    "packageId" : 60,
                    "packageDescription" :"Romantic package at Jamaica exclusively for couples",
                    "cost" : 1222,     
                    "detail": "4 days, 3 nights",
                    "rating":2,
                    "numReviews":309,
                    "imageId": "15",
                    "locality": "Treasure Beach" 
                },
                 {
                    "packageId" : 61,
                    "packageDescription" :"Romantic package at Jamaica exclusively for couples",
                    "cost" : 1211,     
                    "detail": "4 days, 3 nights",
                    "rating":3,
                    "numReviews":206,
                    "imageId": "14",
                    "locality": "Seven mile beach" 
                },
                 {
                    "packageId" : 62,
                    "packageDescription" :"Exclusive package at Jamaica for couples",
                    "cost" : 1212,     
                    "detail": "4 days, 3 nights",
                    "rating":2,
                    "numReviews":101,
                    "imageId": "22",
                    "locality": "Rose Hall Beach" 
                },
                 {
                    "packageId" : 63,
                    "packageDescription" :"All Inclusive package to Boston Bay",
                    "cost" : 1222,     
                    "detail": "4 days, 3 nights",
                    "rating":1,
                    "numReviews":202,
                    "imageId": "20",
                    "locality": "Boston Bay Beach" 
                },
                 {
                    "packageId" : 64,
                    "packageDescription" :"Romantic package at Jamaica exclusively for couples",
                    "cost" : 1233,     
                    "detail": "4 days, 3 nights",
                    "rating":2,
                    "numReviews":401,
                    "imageId": "19",
                    "locality": "Cornwall Beach"

                },
                {
                    "packageId" : 65,
                    "packageDescription" :"Exclusive Adventure package to the Secret Falls of Jamaica.",
                    "cost" : 213,     
                    "detail": "3 days, 2 nights",
                    "rating":3,
                    "numReviews":233,
                    "imageId": "12",
                    "locality": "Irie Blue Hole"
                }
                ];

var cities = [
              {
                  "city": "Ocho Rios",
                  "description": "Ocho Rios is a port town on Jamaica’s north coast. A former fishing village, it’s now a resort with a cruise ship harbor and a busy bay beach that’s lined with hotels. The surrounding parish of Saint Ann is home to rainforest, rivers and waterfalls. Dunn’s River Falls is a terraced, 180m mountain waterfall with lagoon pools, surrounded by trees.",
                  "rating": 5,
                  "numReviews": 344,
                  "imageId": "1"
               },
               {
                  "city": "Grand Cayman Island",
                  "description": "Grand Cayman Island is the largest of the three Cayman Islands. It offers complete relaxation, exquisite dining, exciting nightlife or the awesome underwater sights of reefs. The water, the beach and nature discovery makes Grand Cayman Island beautiful.",
                  "rating": 4,
                  "numReviews": 113,
                  "imageId": "2"
               },
               {
                  "city": "Montego Bay",
                  "description": "Montego Bay, the capital of St. James Parish on Jamaica’s north coast, is a major cruise ship port with numerous beach resorts and golf courses outside its commercial core. Popular beaches include Doctor’s Cave Beach and Walter Fletcher Beach, home to an amusement park. There’s snorkeling and diving at coral reefs in the protected waters of Montego Bay Marine Park.",
                  "rating": 5,
                   "numReviews": 232,
                  "imageId": "3"
               },
               {
                  "city": "Negril",
                  "description": "Negril is a laid-back town in western Jamaica. It’s known for its miles of uninterrupted white-sand beaches on shallow bays with calm, pale waters. Seven Mile Beach, particularly the portion overlooking Long Bay, is lined with bars, restaurants and resorts, many of them international and all-inclusive. It's also popular for water sports. At night, reggae and dancehall music emanates from surfside clubs.",
                  "rating": 3,
                   "numReviews": 333,
                  "imageId": "4"
               },
               {
                  "city": "Bridgetown",
                  "description": "Bridgetown is the capital and largest city of the nation of Barbados. Shopping is plentiful in Bridgetown. The capital of Barbados offers duty-free shopping at cruise ship terminals and upscale boutiques on Broad Street. For history there is the Barbados Museum, National Heroes Square (formerly Trafalgar Square) and the oldest Jewish synagogue in the western hemisphere, as well as the house where George Washington stayed.",
                  "rating": 4,
                   "numReviews": 251,
                  "imageId": "5"
               },
               {
                  "city": "St.Peter",
                  "description": "Located in the north-west of Barbados, the parish of St.Peter is home to several historical sites including the town of Speightstown, St. Nicholas Abbey and Arlington House Interactive Museum. One can also explore quaint fishing villages, a Wildlife Reserve and a tropical forest. On the west coast are many excellent beaches and dive spots.",
                  "rating": 4,
                   "numReviews": 134,
                  "imageId": "6"
               },
               {
                  "city": "Kingston",
                  "description": "Kingston is the capital and largest city of Jamaica, located on the southeastern coast of the island. Far from the north coast resort towns, Kingston is Jamaica at its most authentic, a sprawling city of contrasts spread between the east coast and the Blue Mountains. Travelers can discover the spirit of One Love at the Bob Marley Museum, or sample delicious ice cream at Devon House. Nearby, the former capital of Spanish Town offers insight into the area's history.",
                  "rating": 3,
                   "numReviews": 302,
                  "imageId": "7"
               },
               {
                  "city": "Little Cayman",
                  "description": "Little Cayman is one of three islands comprising the Cayman Islands. It is an absolute paradise of beaches, lagoons, lush foliage and amazing diving. Little Cayman's waters are among the top three diving sites in the world. Reefs, shipwrecks and Little Cayman's Bloody Bay Wall, considered the Caribbean's most sensational wall dive, create unforgettable dips. ",
                  "rating": 4,
                   "numReviews": 221,
                  "imageId": "8"
               },


               {
                  "city": "Cayman Brac",
                  "description": "Home to fruit bats, herons, wild green parrots and an abundance of tropical foliage, the 12-mile-long island of Cayman Brac boasts more than 170 caves and 1400 inhabitants. Named for the imposing limestone bluff, or Brac in Scottish Gaelic, that looms 140 feet above the sea, the middle Cayman offers spectacular diving at Wilderness Wall and Peter's Cave. Emerald green parrots flock at National Trust Parrot Reserve.",
                  "rating": 4,
                   "numReviews": 155,
                  "imageId": "9"
               },
               {
                  "city": "Speightstown",
                  "description": "Speightstown also known as Little Bristol, is the second largest town center of Barbados. It is situated 12 miles north of the capital city of Bridgetown, in the northern parish of Saint Peter. Its known for its Bays, wrecks such as Pamir and also caves.",
                  "rating": 2,
                   "numReviews": 141,
                  "imageId": "10"
               },
               {
                  "city": "Oistins",
                  "description": "The coastal town of Oistins is an area located in the country of Barbados. Situated in the southern portion of the parish of Christ Church, Oistins operates mostly as a fishing village and a tourist hang out. Oistins is also home to the former Christ Church hospital, the former Barbados Coast Guard station, and the offshore landing for ships delivering fossils fuels to the island. Oistins also contains bars and shopping centers.",
                  "rating": 3,
                   "numReviews": 161,
                  "imageId": "11"
               },
               {
                  "city": "Bottom Bay ",
                  "description": "Bottom Bay is located on the southeast coast of Barbados, between Cave Bay and Palmetto Bay. According to the locals and many tourists, Bottom Bay has the best beach on Barbados.",
                  "rating": 2,
                   "numReviews": 166,
                  "imageId": "12"
               },
               {
                  "city": "Six Cross Roads",
                  "description": "Six Cross Roads was an old village in the Parish of Saint Philip in Barbados. Today, the village has been sectioned off and sold for retail and housing purposes. It’s known for its beaches and also is the place of the Sam Lord’s castle. ",
                  "rating": 4,
                   "numReviews": 112,
                  "imageId": "13"
               },
               {
                  "city": "Mount Standfast",
                  "description": "Mount Standfast in Barbados is close to the Alleynes Bay and has all the resorts and residences near the Bay. The warm waters of the bay are great for swimming and also many water sports.",
                  "rating": 3,
                   "numReviews": 131,
                  "imageId": "14"
               },
               {
                  "city": "Batts Rock",
                  "description": "Batts Rock is located on the west coast of Barbados just a few minutes from the capital city of Bridgetown. Batts Rock is a designated public beach area, the sea here is calm and excellent for swimming while the crystal-clear waters and small rocky areas also make it an interesting snorkeling location.",
                  "rating": 3,
                   "numReviews": 142,
                  "imageId": "15"
               },
               {
                  "city": "Porters",
                  "description": "Located along the west coast, in the parish of St.James of Barbados is Porters . The 'Colony Club' (also known as 'Heron Bay') beach is located here and it is the destination for tourists with the thirst for water sports and also who are looking for a rather silent place away from the cities. ",
                  "rating": 2,
                   "numReviews": 145,
                  "imageId": "16"
               },
               {
                  "city": "Mullins",
                  "description": "Mullins, located in the parish of St.Peter, is known for its beach which is one of the most popular beaches on the west coast. This is the place one can relax in a lounge chair under the umbrellas and shade of the Casuarina or palm trees, take a dip in the safely roped off areas, or venture out further on a jet ski. The beach bar is a great spot to grab a drink, snack or lunch during the day, or to drop by later on for a romantic sunset dinner or nightcap.",
                  "rating": 3,
                   "numReviews": 152,
                  "imageId": "17"
               },
                   {
                  "city": "Saint Lawrence Gap",
                  "description": "Entertainment in Barbados starts in St.Lawrence Gap, A stroll through The Gap reveals a number of nightclubs, catering to all musical tastes. St.Lawrence Gap, a 1.3 km stretch of road in the parish of Christ Church, is famous for it's fine restaurants, diverse accommodation, lively nightlife and good shopping. 'The Gap', as it is commonly known, is a place where various cultures meet and merge.",
                  "rating": 5,
                   "numReviews": 452,
                  "imageId": "18"
               },
                   {
                  "city": "Harrismith",
                  "description": "Harrismith in Barbados located on the south east coast of the island just a short walk from the popular Bottom Bay is known for its beach. The beach at Harrismith is not as wide as other popular beaches in the area but it has a shallow lagoon protected by the reef, which is ideal for a relaxing dip. A series of old stone steps leads down to the beach from the cliff top. Overlooking the beach are the ruins of an old plantation house, which you one safely survey from the outside",
                  "rating": 3,
                   "numReviews": 165,
                  "imageId": "19"
               },
                   {
                  "city": "Bathsheba",
                  "description": "Bathsheba is the main fishing village in the parish of Saint Joseph with some 5,000 inhabitants on the east coastline of Barbados. It has a number of attractions including the Flower Forest and Cotton Tower, which is renowned for its dramatic scenery and views of Scotland District. Bathsheba beach is known as the Soup Bowl where local and international surfing competitions take place annually. Another notable feature of Bathsheba beach is the large boulder that sits slightly offshore, known by some as Bathsheba Rock.",
                  "rating": 5,
                   "numReviews": 345,
                  "imageId": "20"
               },
                   {
                  "city": "Martin's Bay",
                  "description": "Martin's Bay is a small fishing village located on the east coast of the island in the parish of St.John. This is a quiet little haven where a shallow reef breaks the waves and creates small pools perfect for soaking in. Like many lookouts on the east coast, the views at Martins Bay are quite beautiful and it's well worth a stop as you drive around the island. At the northern end of the bay are the awe-inspiring rock formations that characterize the east coast of Barbados. At the southern end, you can climb onto the cliffs overlooking the coast and hike the old train line to Bath beach.",
                  "rating": 3,
                   "numReviews": 331,
                  "imageId": "21"
               },
                   {
                  "city": "Morgan Lewis",
                  "description": "Morgan Lewis is located in the northern parish of St. Andrew overlooking the eastern coastline of the island and the lush Scotland District. It is known for its sugar mill, which is one of the only two intact and restored sugar mills in the Caribbean. It is also known as a scenic location and also has a great beach.",
                  "rating": 3,
                   "numReviews": 232,
                  "imageId": "22"
               },
                   {
                  "city": "Ragged Point",
                  "description": "Ragged Point is a village in Saint Philip Parish in Barbados. Ragged Point is the most easterly point of the island and offers a spectacular view of the rugged coastal scenery along almost the entire east coast of Barbados. In fact, on a clear day one can see all the way up the coastline to the northern points of the island such as Cove Bay and Pico Tenerife. Off the coast lies Culpepper Island, a tiny island that can be reached by swimming at low tide. Located at Ragged Point is one of four lighthouses on the island, the others being found at South Point, Needhams Point and Harrison Point. ",
                  "rating": 3,
                   "numReviews": 305,
                  "imageId": "23"
               },
                   {
                  "city": "Goat House Bay",
                  "description": "Tucked away below the rugged cliff top in the north of Barbados is the inviting Goat House Bay, which truly is Barbados at its unspoiled best. One can drive quite close the bay, turning off the main road at Rockfield, parking by a row of Casuarina trees (which makes a lovely picnic spot), and continuing the rest of the way on foot. Head to the west along the cliff tops and you'll soon spot the bay. One can take a scenic walk along the cliff tops enjoying the refreshing ocean breezes, ruggedly beautiful coastline, and pounding surf.",
                  "rating": 3,
                   "numReviews": 186,
                  "imageId": "24"
               },
                   {
                  "city": "Maycock's Bay",
                  "description": "Maycock's Bay is located between Six Men's Bay and Harrison Point in St. Lucy, the northwest of Barbados. It is on the west coast of the island to the north. Its is an idyllic little spot on the northwest coast of Barbados. From the cliff top overlooking the bay, one can enjoy fabulous views up and down the coastline. Whales are often spotted here in the early morning between December and April. Sharks are frequent visitors to this bay. ",
                  "rating": 2,
                   "numReviews": 181,
                  "imageId": "25"
               },
                   {
                  "city": "River Bay",
                  "description": "River Bay, located on the north coast of Barbados, is a very popular picnic spot and many persons head to the area on weekends and public holidays. During the week River Bay is much quieter. This is an ideal lookout spot from which one can see the impressive northern coastline where the waves pound the cliffs, creating breathtaking sea sprays. Whales are occasionally spotted off this coastline.",
                  "rating": 3,
                   "numReviews": 171,
                  "imageId": "26"
               },
                   {
                  "city": "South Coast",
                  "description": "Located in Jamaica, here one can have a really luxurious experience right by the sea. If one is looking to spend the night in the lap of luxury, in true Jamaican heritage, this is the right place. With great houses, converted into lavish hotels with breath-taking views, one is sure to feel like royalty. It also has many resorts, private coves, Dining and Nightclubs. ",
                  "rating": 3,
                   "numReviews": 161,
                  "imageId": "27"
               },
                   {
                  "city": "Port Antonio",
                  "description": "Port Antonio is the capital of the parish of Portland on the northeastern coast of Jamaica, about 60 miles from Kingston. It is the island's third largest port, famous as a shipping point for bananas and coconuts, as well as one of its most important tourist attractions. One popular sight in this area is the Blue Lagoon, Jamaica, which owes its color to its depth of 200 feet; other sights include the secluded Frenchman's Cove Beach, the ruins of Folly Mansion and the historic DeMontevin Lodge. ",
                  "rating": 2,
                   "numReviews": 153,
                  "imageId": "28"
               },
               {
                  "city": "Gibbes",
                  "description": "The Gibbes is famous for its beach located on the beautiful west coast of Barbados, also known as the Gold Coast and adjoins the Mullins Beach. It is considered one of the most unpopulated areas on the island and is a perfect location for relaxing in a quiet and peaceful atmosphere under the warm Caribbean sun. ",
                  "rating": 3,
                   "numReviews": 156,
                  "imageId": "27"
               }


            ];





