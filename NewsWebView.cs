using System.Collections;
using UnityEngine;

public class NewsWebView : MonoBehaviour
{
	public string Url;
	public string SameDomainUrl;
	public GUIText status;
	WebViewObject webViewObject;

	IEnumerator Start()
	{
		webViewObject =
			(new GameObject("WebViewObject")).AddComponent<WebViewObject>();
		webViewObject.Init((msg)=>{
			//Debug.Log(string.Format("CallFromJS[{0}]", msg));
			status.text = msg;
			status.GetComponent<Animation>().Play();
		});
		//Screen.height / 4
		webViewObject.SetMargins(Screen.width / 4, Screen.height / 4, Screen.width / 4, Screen.height / 4);
		webViewObject.SetVisibility(true);

		switch (Application.platform) {
		case RuntimePlatform.OSXEditor:
		case RuntimePlatform.OSXPlayer:
		case RuntimePlatform.IPhonePlayer:
		case RuntimePlatform.Android:
			var src = System.IO.Path.Combine (Application.streamingAssetsPath, Url);
			var dst = System.IO.Path.Combine (Application.persistentDataPath, Url);
			//Debug.Log (Url);
			var result = "";
			if (src.Contains("://")) {
				var www = new WWW(src);
				yield return www;
				result = www.text;
			} else {
				result = System.IO.File.ReadAllText(src);
			}
			webViewObject.LoadURL(Url);
			break;
		}
	}
}
