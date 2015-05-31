package com.rateimpactor.services;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

import org.json.JSONArray;

@Path ("/rateimpactor")
public class RateImpactorServices {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}
	/*@Context 
		private MessageContext context;*/

	@GET
	@Path("/getPremium/{type}")
	public String getMyRequests (@PathParam(value = "type") String type)
	{
		JSONArray  graphData= new JSONArray();
		int currYVal [] = {650,700,710,658}, revisedYVal [] = {755,610,950,760};//later obtained from database
		
		if(type.equalsIgnoreCase("current"))
		{
			for(int yVal :currYVal)
			{
				graphData.put(yVal);
			}
		}
		if(type.equalsIgnoreCase("revised"))
		{
			for(int yVal :revisedYVal)
			{
				graphData.put(yVal);
			}

		}
		return graphData.toString();
	}
}
