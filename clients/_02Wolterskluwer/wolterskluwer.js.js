module.exports = 
{
  
		auth: function (req, res) 
	{    
		return post_auth (req, res);
	},
	token: function (req, res) 
	{    
		return post_token (req, res);
	},
	search: function (req, res) 
	{    
		return post_search (req, res);
	}
	
};	


function post_auth(req, res) {
		
	var obj = {"d":{"__metadata":{"type":"identity.AuthenticateResponse"},"SecurityToken":{"__metadata":{"type":"common.SecurityToken"},"Content":"eJzlVl1v2jAU/SvI7yQQSitZEIm1moTUdt1g1bSXyTgX6pHYyL5e6L/fdSB8tEBpnybtKfH1PeeeY1876Y1AeqvweWzmoBvLIteOa3fVZ0+ICx7HDuwfJcFFpckRrJvnvgQbSVPE+LwAF9NbYXTstXwCOYeMbUguzyfJlJhp41BJt8V3z8FnRh6BX7zbgxQLMVG5QgU7PJ138xTgnJjBliI5n2IiHFRva/R7i7O0J41G0LiuvnRqw1GWZVR2ImNncdJqteMfd7cj2rZCNJV2KLQMmp3iWuV9htYDi9OeE0We8IEjAahM3SNVtM+81dwIp8ilINscJR8N7m55ErW4qCGsMXTOw7CqgX2WtNqXzXbSTDrjpMNbHd7tRldXFz9Z45GMEYBSoharS1dgm4ZS5HHfP89gKnyOvXgvd40c+clvkFgP70ni8Kbx2dhC4HHt7ahdRVTWnFap3Gu3AKmmKrR3YPnqRR6GdsVyVBZLx4PBd1qGX+1a4UrEC4XXRk9VKEXmT0zdCBSNe4OfgITBiYWkbYtPFIgPLg/lZCokuDryRcNYFUAGtoSvswYen/QIBUIR2q4avr3Xe+jr0LJLPBS7zqmPvsE0PdlqksuQR+EHepTGZg/WIJmDbGwFbZ+xmx45yL5TmUwoSSulZ2Fkwu24tb8vNz60AhsuRKsmHuH4TNVMb/RQZZe9gj6K3MNHz/ga9TZodR+EC6bPlnTqqbieHejqfVnpq/DHnOdmpvQw+z/NCymN1/hvmj/f+svIzmGop+rvBEX2fkfSvxkmF/g*"},"AuthenticationTypes":{"results":["0"]},"RecognizedIP":null,"RecognizedReferrerURL":null}};

	res.send(JSON.stringify(obj, null, 4));
	
}


function post_token(req, res) {
		
	var obj = {"d":{"__metadata":{"type":"common.SecurityToken"},"Content":"eJzlVl1v2jAU/Sso7/kgaaG1IFIKrYTUdt1g1bSXyTgX6jWxkT8W+u93nRIoLVDap0l7Ir6+59xzrm8cemNgVnHzNJGPIFrLshCaCN3tew/GLEgYalB/OAMdVLIwoPRjYStQAZNlaJ4WoEN8KqUIrWAPwB4h99YkneNJck7nQmrDmd7gT4/B55LtgZ982AOjCzrlBTccXvAkH+YpQWs6hw1FfDzFlGqon1bojxb30h6TwoAwq+pLzdccVVUFVRJINQ/jKGqHP26ux3hsJfW50IYK5jRrTgQv+p5RFrww7WlaFjHJNAowXDYzUkf7nlWCSKo5uqRomxhGxtnNNYmDiNAG4rVGWlsY1TVM34ujdsdvx36cTOKERF1y2g6Ss+5Pr3WPxhCAKUHkNaVrsEpdKfS47Z/kMKO2ML1wK3eFHNvpb2CmWd6ixNGwdSVVSc1+7e2gXUd47s/qVGKFXgDjM+7G27F8tbRwS/XMsleWl06y7Du24Ve7Ufgs4pXCgRQz7kqh+QNbQ2po61aaC0BhcKCReGzhgQLhzvZgTs5dgm4iXwRMeAloYEP4Niuz5kGMDTVQurGrl0ec9RjfEqQZiRyWfW8QD4bnyWXmZ50s8U+i5NLPLhxueH5+dnV50om6m4moSwzcmC/NrtigwNn7BrP04Hgywlwehu/wp5Iqv1PSYEMgnyiKRy7Veq52sr+ojMY5w+6KuVtJd6NuWrYtN9zVtTWXMYpPrYH9O/UAvjN3tV3vDfSeFhY+ey+sUO+Dnu8Qdyn1vSXeFFhczHe8Cduy0jfhzzkv5JyLUf5/mqeMSSvMv2n+eOuvIy9ehmar+bZgZOsvTPoXq6MlcA**"}};

	res.send(JSON.stringify(obj, null, 4));
	
}


function post_search(req, res) {
		
	var obj = {"d":{"__metadata":{"id":"https://fusedweb.cloudapp.net/Research.svc/Searches('6530328')","uri":"https://fusedweb.cloudapp.net/Research.svc/Searches('6530328')","type":"research.Search"},"Id":"6530328","InitialSearchId":null,"Metadata":{"__metadata":{"type":"research.SearchMetadata"},"SearchTypeValue":0,"Query":"tax","QueryProcessingParams":{"__metadata":{"type":"research.QueryProcessingParams"},"QueryLocale":"en","UseThesaurusDictionary":false,"DictionaryResourceId":null,"CitationComboMode":false,"DefaultPhraseOperatorValue":null},"CitationInfo":null,"ScopeInfo":{"__metadata":{"type":"research.SearchScopeInfo"},"SubscriptionLevelValue":1,"HistoricalContentTree":null,"Workspace":{"__metadata":{"type":"research.WorkspaceInfo"},"Id":"-1","Title":"All Content"},"PitOptions":null,"IncludeArchivePubs":null,"IncludeModelDocuments":null},"FilterInfo":null,"ClusterInfo":null,"Tag":null,"ExtendedMetadataParams":null,"Shared":null},"CreatedDate":"/Date(1482512947953)/","UpdatedDate":null,"LastRunDate":null,"Result":{"__deferred":{"uri":"https://fusedweb.cloudapp.net/Research.svc/Searches('6530328')/Result"}}}};

	res.send(JSON.stringify(obj, null, 4));
	
}