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

	public List<DishItem> getCourseItems() {
		return dishItems;
	}

	public void setCourseItems(List<DishItem> courseItems) {
		this.dishItems = courseItems;
	}
}
