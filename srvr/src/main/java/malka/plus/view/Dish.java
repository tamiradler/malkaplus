package malka.plus.view;

import java.util.List;

public class Dish 
{
	private String subject;
	
	List <DishItem> dishItems;

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public List<DishItem> getDishItems() {
		return dishItems;
	}

	public void setDishItems(List<DishItem> courseItems) {
		this.dishItems = courseItems;
	}
}
