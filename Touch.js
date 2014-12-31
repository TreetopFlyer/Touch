var Touch = {};
Touch.Create = function(inJQ)
{
	var obj = new Object();
	
	obj.Pad = inJQ;
	obj.Bound = false;
	obj.EventX = 0;
	obj.EventY = 0;
	obj.OldX = 0;
	obj.OldY = 0;
	obj.NewX = 0;
	obj.NewY = 0;
	obj.DeltaX = 0;
	obj.DeltaY = 0;
	obj.AbsX = 0;
	obj.AbsY = 0;
	
	obj.User = function(){};
	obj.Prep = function(inEvent)
	{
		inEvent.preventDefault();
		obj.EventX = inEvent.touches.item(0).clientX;
		obj.EventY = inEvent.touches.item(0).clientY;
	};
	obj.Start = function(e)
	{
		obj.Prep(e);
		
		obj.NewX = obj.EventX;
		obj.NewY = obj.EventY;
		
	};
	obj.Move = function(e)
	{
		obj.Prep(e);
		
		obj.OldX = obj.NewX;
		obj.OldY = obj.NewY;
		
		obj.NewX = obj.EventX;
		obj.NewY = obj.EventY;
		
		obj.DeltaX = (obj.NewX - obj.OldX);
		obj.DeltaY = (obj.NewY - obj.OldY);
		
		obj.AbsX += obj.DeltaX;
		obj.AbsY += obj.DeltaY;
		
		obj.User();
	};
	
	obj.Unbind = function()
	{
		if(obj.isBound)
		{
			obj.isBound = false;
			obj.Pad.get(0).removeEventListener("touchstart", obj.Start);
			obj.Pad.get(0).removeEventListener("touchmove", obj.Move);
		}
	};
	obj.Bind = function()
	{
		if(!obj.isBound)
		{
			obj.isBound = true;
			obj.Pad.get(0).addEventListener("touchstart", obj.Start, false);
			obj.Pad.get(0).addEventListener("touchmove", obj.Move, false);
		}
	};
	obj.Bind();
	
	return obj;
};