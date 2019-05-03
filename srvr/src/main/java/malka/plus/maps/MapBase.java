package malka.plus.maps;

import java.util.List;

import org.modelmapper.ModelMapper;

public class MapBase <SRC, TARGET>
{
	public void apply(SRC src, TARGET target)
	{
		ModelMapper mapper = new ModelMapper();
		mapper.map(src, target);
	}
	
	
	public void apply(List<SRC> srcs, List<TARGET> targets, Class <TARGET> targetClass)
	{
		try 
		{
			if (srcs == null || srcs.isEmpty())
			{
				return;
			}
			
			for (SRC src : srcs) 
			{
				TARGET target;
				target = targetClass.newInstance();
				apply(src, target);
				targets.add(target);
			}
		}
		catch (InstantiationException | IllegalAccessException e) 
		{
			e.printStackTrace();
		}
	}
}
