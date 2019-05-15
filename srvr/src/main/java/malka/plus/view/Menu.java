package malka.plus.view;

import java.util.List;

import malka.plus.model.Dish;

public class Menu 
{
	private String dateId;
	
	private List <Dish> dishs;

	public String getDateId() {
		return dateId;
	}

	public void setDateId(String dateId) {
		this.dateId = dateId;
	}

	public List<Dish> getDishs() {
		return dishs;
	}

	public void setDishs(List<Dish> dishs) {
		this.dishs = dishs;
	}
}
