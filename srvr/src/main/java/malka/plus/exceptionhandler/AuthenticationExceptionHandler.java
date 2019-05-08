package malka.plus.exceptionhandler;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import malka.plus.exceptions.AuthenticationException;

@ControllerAdvice
public class AuthenticationExceptionHandler extends ResponseEntityExceptionHandler 
{
	@ExceptionHandler(value = { AuthenticationException.class })
	protected ResponseEntity<Object> handleAuthenticationException(RuntimeException ex, WebRequest request) 
	{
		String bodyOfResponse = "The user UNAUTHORIZED.";
		return handleExceptionInternal(ex, bodyOfResponse, new HttpHeaders(), HttpStatus.UNAUTHORIZED, request);
	}
}
