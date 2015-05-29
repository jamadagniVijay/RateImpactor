package com.rateimpactor.services;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

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
		String graphData= "";
		if(type.equalsIgnoreCase("current"))
		{
			graphData="["+
		              " { x: 1, y: 650 ,label: 'Building'},"+
		              " { x: 2, y: 700 ,label: 'Personal Property' },"+
		               "{ x: 3, y: 710 ,label: 'Business Income'},"+
		               "{ x: 4, y: 658 ,label: 'SBP' }"+
		              " ]";
		}
		if(type.equalsIgnoreCase("revised"))
		{
			graphData="["+
		              " { x: 1, y: 755 ,label: 'Building'},"+
		              " { x: 2, y: 610 ,label: 'Personal Property' },"+
		               "{ x: 3, y: 950 ,label: 'Business Income'},"+
		               "{ x: 4, y: 760 ,label: 'SBP' }"+
		              " ]";
		}
		return graphData;
	}
}
