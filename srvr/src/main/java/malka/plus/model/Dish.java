package malka.plus.model;

import java.util.List;

public class Dish 
{
	private String subject;
	
	private List <DishItem> dishItems;

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
