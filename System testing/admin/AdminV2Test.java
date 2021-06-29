// Generated by Selenium IDE
import org.junit.Test;
import org.junit.Before;
import org.junit.After;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.core.IsNot.not;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Alert;
import org.openqa.selenium.Keys;
import java.util.*;
import java.net.MalformedURLException;
import java.net.URL;
public class AdminV2Test {
  private WebDriver driver;
  private Map<String, Object> vars;
  JavascriptExecutor js;
  @Before
  public void setUp() {
    driver = new ChromeDriver();
    js = (JavascriptExecutor) driver;
    vars = new HashMap<String, Object>();
  }
  @After
  public void tearDown() {
    driver.quit();
  }
  @Test
  public void adminV2() {
    // Test name: Admin_V2
    // Step # | name | target | value | comment
    // 1 | open | / |  | 
    driver.get("http://localhost:8080/");
    // 2 | setWindowSize | 1680x971 |  | 
    driver.manage().window().setSize(new Dimension(1680, 971));
    // 3 | click | css=.form-label-group:nth-child(1) > label |  | 
    driver.findElement(By.cssSelector(".form-label-group:nth-child(1) > label")).click();
    // 4 | type | id=inputUsername | a.marino@unisa.it | 
    driver.findElement(By.id("inputUsername")).sendKeys("a.marino@unisa.it");
    // 5 | click | css=.form-label-group:nth-child(2) > label |  | 
    driver.findElement(By.cssSelector(".form-label-group:nth-child(2) > label")).click();
    // 6 | type | id=inputPassword | andre123 | 
    driver.findElement(By.id("inputPassword")).sendKeys("andre123");
    // 7 | sendKeys | id=inputPassword | ${KEY_ENTER} | 
    driver.findElement(By.id("inputPassword")).sendKeys(Keys.ENTER);
    // 8 | click | css=.swal-button |  | 
    driver.findElement(By.cssSelector(".swal-button")).click();
    // 9 | click | css=.form-label-group:nth-child(1) > label |  | 
    driver.findElement(By.cssSelector(".form-label-group:nth-child(1) > label")).click();
    // 10 | click | id=inputUsername |  | 
    driver.findElement(By.id("inputUsername")).click();
    // 11 | type | id=inputUsername | a.marino@unisa.it | 
    driver.findElement(By.id("inputUsername")).sendKeys("a.marino@unisa.it");
    // 12 | click | css=.form-label-group:nth-child(2) > label |  | 
    driver.findElement(By.cssSelector(".form-label-group:nth-child(2) > label")).click();
    // 13 | type | id=inputPassword | andrea123 | 
    driver.findElement(By.id("inputPassword")).sendKeys("andrea123");
    // 14 | sendKeys | id=inputPassword | ${KEY_ENTER} | 
    driver.findElement(By.id("inputPassword")).sendKeys(Keys.ENTER);
    // 15 | click | css=.swal-button |  | 
    driver.findElement(By.cssSelector(".swal-button")).click();
    // 16 | click | css=.nav-item:nth-child(4) p |  | 
    driver.findElement(By.cssSelector(".nav-item:nth-child(4) p")).click();
    // 17 | click | css=.form-label-group:nth-child(2) > label |  | 
    driver.findElement(By.cssSelector(".form-label-group:nth-child(2) > label")).click();
    // 18 | type | id=inputNameCI | Alice | 
    driver.findElement(By.id("inputNameCI")).sendKeys("Alice");
    // 19 | type | id=inputSurnameCI | Vidoni | 
    driver.findElement(By.id("inputSurnameCI")).sendKeys("Vidoni");
    // 20 | type | id=inputEmailCI | ali | 
    driver.findElement(By.id("inputEmailCI")).sendKeys("ali");
    // 21 | sendKeys | id=inputEmailCI | ${KEY_ENTER} | 
    driver.findElement(By.id("inputEmailCI")).sendKeys(Keys.ENTER);
    // 22 | click | id=inputEmailCI |  | 
    driver.findElement(By.id("inputEmailCI")).click();
    // 23 | type | id=inputEmailCI | alice.vidoni@gmail.com | 
    driver.findElement(By.id("inputEmailCI")).sendKeys("alice.vidoni@gmail.com");
    // 24 | click | css=.form-label-group:nth-child(5) > label |  | 
    driver.findElement(By.cssSelector(".form-label-group:nth-child(5) > label")).click();
    // 25 | type | id=inputPassword | alicepiccola123 | 
    driver.findElement(By.id("inputPassword")).sendKeys("alicepiccola123");
    // 26 | click | css=.form-label-group:nth-child(6) > label |  | 
    driver.findElement(By.cssSelector(".form-label-group:nth-child(6) > label")).click();
    // 27 | type | id=inputRePassword | alicepiccola123 | 
    driver.findElement(By.id("inputRePassword")).sendKeys("alicepiccola123");
    // 28 | click | id=send |  | 
    driver.findElement(By.id("send")).click();
    // 29 | click | css=.swal-button |  | 
    driver.findElement(By.cssSelector(".swal-button")).click();
    // 30 | click | css=.nav-item:nth-child(5) p |  | 
    driver.findElement(By.cssSelector(".nav-item:nth-child(5) p")).click();
    // 31 | click | id=tipo |  | 
    driver.findElement(By.id("tipo")).click();
    // 32 | select | id=tipo | label=Commissione Internazionale | 
    {
      WebElement dropdown = driver.findElement(By.id("tipo"));
      dropdown.findElement(By.xpath("//option[. = 'Commissione Internazionale']")).click();
    }
    // 33 | click | css=.card:nth-child(4) #delUser |  | 
    driver.findElement(By.cssSelector(".card:nth-child(4) #delUser")).click();
    // 34 | mouseOver | css=.card:nth-child(4) #delUser |  | 
    {
      WebElement element = driver.findElement(By.cssSelector(".card:nth-child(4) #delUser"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).perform();
    }
    // 35 | mouseOut | css=.card:nth-child(4) #delUser |  | 
    {
      WebElement element = driver.findElement(By.tagName("body"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element, 0, 0).perform();
    }
    // 36 | click | css=.swal-button--confirm |  | 
    driver.findElement(By.cssSelector(".swal-button--confirm")).click();
    // 37 | click | css=.swal-button |  | 
    driver.findElement(By.cssSelector(".swal-button")).click();
    // 38 | click | css=.card:nth-child(4) #delUser |  | 
    driver.findElement(By.cssSelector(".card:nth-child(4) #delUser")).click();
    // 39 | click | css=.swal-button--confirm |  | 
    driver.findElement(By.cssSelector(".swal-button--confirm")).click();
    // 40 | click | css=.swal-button |  | 
    driver.findElement(By.cssSelector(".swal-button")).click();
    // 41 | click | linkText=Logout |  | 
    driver.findElement(By.linkText("Logout")).click();
    // 42 | click | css=.swal-button |  | 
    driver.findElement(By.cssSelector(".swal-button")).click();
  }
}
