package malka.plus.view;

import java.util.List;

import malka.plus.model.Dish;

public class Menu 
{
	private String dateId;
	
	private List <Dish> courses;

	public String getDateId() {
		return dateId;
	}

	public void setDateId(String dateId) {
		this.dateId = dateId;
	}

	public List<Dish> getCourses() {
		return courses;
	}

	public void setCourses(List<Dish> courses) {
		this.courses = courses;
	}
}
