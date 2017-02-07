// Identify user agent
var browser = (function(){
    var ua= navigator.userAgent, tem, 
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\bOPR\/(\d+)/)
        if(tem!= null) return 'Opera '+tem[1];
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M.join(' ');
})();

var hasWebGL = (function(){
    if (!window.WebGLRenderingContext) 
    {
      // Browser has no idea what WebGL is. Suggest they
      // get a new browser by presenting the user with link to
      // http://get.webgl.org
      return 0;   
    }

    var canvas = document.createElement('canvas'); 
    var gl = canvas.getContext("webgl");   
    if (!gl) 
    {
      gl = canvas.getContext("experimental-webgl");   
      if (!gl) 
      {
        // Browser could not initialize WebGL. User probably needs to
        // update their drivers or get a new browser. Present a link to
        // http://get.webgl.org/troubleshooting
        return 0;  
      }
    }
    return 1;
})();

// Check for mobile browsers
var mobile = (function(a){
    return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))
})(navigator.userAgent||navigator.vendor||window.opera);

function CompatibilityCheck()
{
    // Check for WebGL. Allow running without WebGL on development players for running tests on build farm.
    if (!1 && !hasWebGL)
    {
        alert("You need a browser which supports WebGL to run this content. Try installing Firefox.");
        window.history.back();                
    }
    // Show warnings if needed.
    else if (mobile)
    {
        if (!confirm("Please note that Unity WebGL is not currently supported on mobiles. Press Ok if you wish to continue anyway."))
            window.history.back();        
    }
    else if (browser.indexOf("Firefox") == -1 && browser.indexOf("Chrome") == -1 && browser.indexOf("Safari") == -1)
    {
        if (!confirm("Please note that your browser is not currently supported for this Unity WebGL content. Try installing Firefox, or press Ok if you wish to continue anyway."))
            window.history.back();
    }
}

if (Module.compatibilitycheck)
    Module.compatibilitycheck();
else
    CompatibilityCheck();

var didShowErrorMessage = false;
if (typeof window.onerror != 'function')
{
    function UnityErrorHandler(err, url, line)
    {
        if (Module.errorhandler && Module.errorhandler(err, url, line))
        {
            // error handled by the user
            return;
        }
        console.log ("Invoking error handler due to\n"+err);
        if (typeof dump == 'function')
            dump ("Invoking error handler due to\n"+err);
        if (didShowErrorMessage)
            return;

        // Firefox has a bug where it's IndexedDB implementation will throw UnknownErrors, which are harmless, and should not be shown.
        if (err.indexOf("UnknownError") != -1)
            return;
 
        // Ignore error when application terminated with return code 0
        if (err.indexOf("Program terminated with exit(0)") != -1)
        {
            return;
        }

        didShowErrorMessage = true;
        if (err.indexOf("DISABLE_EXCEPTION_CATCHING") != -1)
        {
            alert ("An exception has occurred, but exception handling has been disabled in this build. If you are the developer of this content, enable exceptions in your project's WebGL player settings to be able to catch the exception or see the stack trace.");
            return;
        }
        if (err.indexOf("Cannot enlarge memory arrays") != -1)
        {
            alert ("Out of memory. If you are the developer of this content, try allocating more memory to your WebGL build in the WebGL player settings.");
            return;        
        }
        if (err.indexOf("Invalid array buffer length") != -1  || err.indexOf("Invalid typed array length") != -1 || err.indexOf("out of memory") != -1)
        {
            alert ("The browser could not allocate enough memory for the WebGL content. If you are the developer of this content, try allocating less memory to your WebGL build in the WebGL player settings.");
            return;                
        }
        alert ("An error occurred running the Unity content on this page. See your browser's JavaScript console for more info. The error was:\n"+err);
    }
    
    Error.stackTraceLimit = 50;
    
    function demangleSymbol(symbol) {
      if (Module.debugSymbols && Module.debugSymbols[symbol])
        symbol = Module.debugSymbols[symbol];
      // All C++ mangled symbols begin with '__Z', where preceding '_' is appended by Emscripten and '_Z' means that the symbol is C++ mangled.
      if (!symbol.lastIndexOf('__Z', 0))
        symbol = (Module.demangle || demangle)(symbol);
      return symbol;
    }
    
    function demangleError(err) {
      // stacktrace example:
      //
      // [Chrome]
      // Error
      //    at Array.eWg (blob:http%3A//localhost%3A8080/7dd54af3-48c5-47e1-893f-5f1ef09ab62b:10:238896)
      //    at Object.P7h [as dynCall_iiii] (blob:http%3A//localhost%3A8080/7dd54af3-48c5-47e1-893f-5f1ef09ab62b:28:33689)
      //    at invoke_iiii (blob:http%3A//localhost%3A8080/972f149f-a28e-4ee9-a1c7-45e8c4b0998b:1:334638)
      //    at DJd (blob:http%3A//localhost%3A8080/7dd54af3-48c5-47e1-893f-5f1ef09ab62b:15:260807)
      //    at Object.dynCall (blob:http%3A//localhost%3A8080/972f149f-a28e-4ee9-a1c7-45e8c4b0998b:1:7492)
      //    at browserIterationFunc (blob:http%3A//localhost%3A8080/972f149f-a28e-4ee9-a1c7-45e8c4b0998b:1:207518)
      //    at Object.runIter (blob:http%3A//localhost%3A8080/972f149f-a28e-4ee9-a1c7-45e8c4b0998b:1:189915)
      //
      // [Firefox]
      // eWg@blob:http://localhost:8080/0e677969-e11c-e24b-bb23-4f3afdbd5a3a:10:1
      // P7h@blob:http://localhost:8080/0e677969-e11c-e24b-bb23-4f3afdbd5a3a:28:1
      // invoke_iiii@blob:http://localhost:8080/67513e21-4cf2-de4e-a571-c6ee67cc2a72:1:334616
      // DJd@blob:http://localhost:8080/0e677969-e11c-e24b-bb23-4f3afdbd5a3a:15:1
      // Runtime.dynCall@blob:http://localhost:8080/67513e21-4cf2-de4e-a571-c6ee67cc2a72:1:7469
      // _emscripten_set_main_loop/browserIterationFunc@blob:http://localhost:8080/67513e21-4cf2-de4e-a571-c6ee67cc2a72:1:207510
      // Browser.mainLoop.runIter@blob:http://localhost:8080/67513e21-4cf2-de4e-a571-c6ee67cc2a72:1:189915
      //
      // [Safari]
      // eWg@blob:http://localhost:8080/6efe7f5a-b930-45c3-9175-296366f9d9f4:10:238896
      // P7h@blob:http://localhost:8080/6efe7f5a-b930-45c3-9175-296366f9d9f4:28:33689
      // invoke_iiii@blob:http://localhost:8080/597cffca-fc52-4586-9da7-f9c8e591738b:1:334638
      // DJd@blob:http://localhost:8080/6efe7f5a-b930-45c3-9175-296366f9d9f4:15:260809
      // dynCall@blob:http://localhost:8080/597cffca-fc52-4586-9da7-f9c8e591738b:1:7496
      // browserIterationFunc@blob:http://localhost:8080/597cffca-fc52-4586-9da7-f9c8e591738b:1:207525
      // runIter@blob:http://localhost:8080/597cffca-fc52-4586-9da7-f9c8e591738b:1:189919
      
      var stackTraceFormat = browser.indexOf('Chrome') != -1 ? '(\\s+at\\s+)(([\\w\\d_\\.]*?)([\\w\\d_$]+)(/[\\w\\d_\\./]+|))(\\s+\\[.*\\]|)\\s*\\((blob:.*)\\)' : 
                                                               '(\\s*)(([\\w\\d_\\.]*?)([\\w\\d_$]+)(/[\\w\\d_\\./]+|))(\\s+\\[.*\\]|)\\s*@(blob:.*)',
          stackTraceFind = new RegExp(stackTraceFormat, 'g'),
          stackTraceParse = new RegExp('^' + stackTraceFormat + '$');
      return err.replace(stackTraceFind, function(trace) {
        var errParse = trace.match(stackTraceParse);
        var functionName = demangleSymbol(errParse[4]);
        var blobParse = errParse[7].match(/^(blob:.*)(:\d+:\d+)$/);
        var url = blobParse && Module.blobInfo && Module.blobInfo[blobParse[1]] && Module.blobInfo[blobParse[1]].url ? Module.blobInfo[blobParse[1]].url : 'blob';
        return errParse[1] + functionName + (errParse[2] != functionName ? ' ['+ errParse[2] + ']' : '') +
          ' (' + (blobParse ? url.substr(url.lastIndexOf('/') + 1) + blobParse[2] : errParse[7]) + ')';
      });
    };

    window.onerror = function(err, url, line) {
      if (!Module.debugSymbolsUrl || Module.debugSymbols)
        return UnityErrorHandler(demangleError(err), url, line);
      LoadCompressedJS(Module.debugSymbolsUrl, function() {
        UnityErrorHandler(demangleError(err), url, line)
      });
    }
}

function SetFullscreen(fullscreen)
{
    if (typeof runtimeInitialized === 'undefined' || !runtimeInitialized)
    {
        console.log ("Runtime not initialized yet.");
        return;
    }
    if (typeof JSEvents === 'undefined')
    {
        console.log ("Player not loaded yet.");
        return;
    }
    var tmp = JSEvents.canPerformEventHandlerRequests;
    JSEvents.canPerformEventHandlerRequests = function(){return 1;};
    Module.cwrap('SetFullscreen', 'void', ['number'])(fullscreen);
    JSEvents.canPerformEventHandlerRequests = tmp;
}
Module.locateFile = function(remotePackageBase) { return Module.dataUrl; };
Module.preRun = [];
Module.postRun = [];
Module.print = (function() {
	return function(text) {
		console.log (text);
	};
})();
Module.printErr= function(text) {
	console.error (text);
};
Module.canvas = document.getElementById('canvas');
Module.progress = null;
Module.setStatus = function(text) {
	if (this.progress == null) 
	{
		if (typeof UnityProgress != 'function')
			return;
		this.progress = new UnityProgress (canvas);
	}
	if (!Module.setStatus.last) Module.setStatus.last = { time: Date.now(), text: '' };
	if (text === Module.setStatus.text) return;
	this.progress.SetMessage (text);
	var m = text.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/);
	if (m)
		this.progress.SetProgress (parseInt(m[2])/parseInt(m[4]));
	if (text === "") 
		this.progress.Clear()
},
Module.totalDependencies = 0;
Module.monitorRunDependencies = function(left) {
  this.totalDependencies = Math.max(this.totalDependencies, left);
  Module.setStatus(left ? 'Preparing... (' + (this.totalDependencies-left) + '/' + this.totalDependencies + ')' : 'All downloads complete.');
};
Module.setStatus('Downloading (0.0/1)');
function LoadJSCodeBlob(blob, onload, blobInfo) {
	var script = document.createElement('script');
	var blobUrl = URL.createObjectURL(blob);
	if (blobInfo) {
		if (!Module.blobInfo)
			Module.blobInfo = {};
		Module.blobInfo[blobUrl] = blobInfo;
	}
	script.src = blobUrl;
	script.onload = function() {
		URL.revokeObjectURL(blobUrl);
		if (onload)
			onload();
	};
	document.body.appendChild(script);
}

function LoadJSCode(code, onload, blobInfo)
{
  // Math.fround opitimization is currently disabled for Chrome as it causes floating point related issues (i.e. in comparison operations involving both float and double)
  if (!Math.fround && blobInfo && blobInfo.id == 'asmUrl') {
    console.log('optimizing out Math.fround calls');
    
    var State = {
      LOOKING_FOR_MODULE: 0,
      SCANNING_MODULE_VARIABLES: 1,
      SCANNING_MODULE_FUNCTIONS: 2,
    };
    var stateSwitchMarker = [
      "EMSCRIPTEN_START_ASM",
      "EMSCRIPTEN_START_FUNCS",
      "EMSCRIPTEN_END_FUNCS",
    ];
    var froundPrefix = "var";
    var froundMarker = "global.Math.fround;";
    
    var position = 0;
    var state = State.LOOKING_FOR_MODULE;
    var froundLast = 0;
    var froundLength = 0;
        
    for(; state <= State.SCANNING_MODULE_FUNCTIONS && position < code.length; position++) {
      if (code[position] == 0x2F && code[position + 1] == 0x2F && code[position + 2] == 0x20 &&
          String.fromCharCode.apply(null, code.subarray(position + 3, position + 3 + stateSwitchMarker[state].length)) === stateSwitchMarker[state]) {
        // if code at position starts with "// " + stateSwitchMarker[state]
        state++;
      } else if (state == State.SCANNING_MODULE_VARIABLES && !froundLength && code[position] == 0x3D &&
          String.fromCharCode.apply(null, code.subarray(position + 1, position + 1 + froundMarker.length)) === froundMarker) {
        // if we are at the module variable section and Math_fround name has not yet been found and code at position starts with "=" + froundMarker
        froundLast = position - 1;
        while(code[froundLast - froundLength] != 0x20)
          froundLength++; // scan back until the first space character (it is always present as at least it is a part of the previously found "// ")
        if (!froundLength || String.fromCharCode.apply(null, code.subarray(froundLast - froundLength - froundPrefix.length, froundLast - froundLength)) !== froundPrefix)
          froundLast = froundLength = 0;
      } else if (froundLength && code[position] == 0x28) {
        // if Math_fround name has been found and code at position starts with "("
        var nameLength = 0;
        while (nameLength < froundLength && code[position - 1 - nameLength] == code[froundLast - nameLength])
          nameLength++;
        if (nameLength == froundLength) {
          var c = code[position - 1 - nameLength];
          if (c < 0x24 || (0x24 < c && c < 0x30) || (0x39 < c && c < 0x41) || (0x5A < c && c < 0x5F) || (0x5F < c && c < 0x61) || 0x7A < c) {
            // if the matched Math_fround name is not a suffix of another identifier, i.e. it's preceding character does not match [$0-9A-Z_a-z]
            for(;nameLength; nameLength--)
              code[position - nameLength] = 0x20; // fill the Math_fround name with spaces (replacement works faster than shifting back the rest of the code)
          }
        }
      }            
    }
  }
  LoadJSCodeBlob(new Blob([code], { type: 'text/javascript' }), onload, blobInfo);
}


var 

CompressionState = {
    Uninitialized : 0,
    Pending : 1,
    Unsupported : 2,
    Supported : 3,
    current : 0,
    pendingServerRequests: [],
    Set: function(state) {
		if (CompressionState.current == CompressionState.Pending)
		{
			CompressionState.current = state;
			for(var i=0;i<CompressionState.pendingServerRequests.length; i++)
			{
				CompressionState.pendingServerRequests[i]();
			}
		}
    }
};

function DecompressAndLoadFile(url, onload, onprogress)
{
	url += window.unityDecompressReleaseFileExtension;

	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.onprogress = onprogress;
	xhr.responseType = 'arraybuffer';
	xhr.onload = function() {
		var byteArray = new Uint8Array(xhr.response);
		var start = new Date().getTime();
		var decompressed = window.unityDecompressReleaseFile(byteArray);
		var end = new Date().getTime();
		console.log ("Decompressed " + url + " in " + (end-start) + "ms. You can remove this delay if you configure your web server to host files using " + window.unityDecompressReleaseFileExtension + " compression.");
   		onload(decompressed);
	};
	xhr.onerror = function() {
		// Edge fails trying to download from file://...
		console.log("Could not download " + url);

		if (!didShowErrorMessage && document.URL.indexOf("file:") == 0)
		{
			alert ("It seems your browser does not support running Unity WebGL content from file:// urls. Please upload it to an http server, or try a different browser.");
			didShowErrorMessage = true;
		}		
	}
	xhr.send(null);
}

function LoadCompressedFile(url, onload, onprogress)
{
	if (CompressionState.current == CompressionState.Unsupported)
	{
		DecompressAndLoadFile(url, onload);
		return;
	}

	if (CompressionState.current == CompressionState.Pending)
	{
		CompressionState.pendingServerRequests.push(function (){LoadCompressedFile(url, onload, onprogress);});
		return;
	}

	if (CompressionState.current == CompressionState.Uninitialized)
		CompressionState.current = CompressionState.Pending;

	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.responseType = 'arraybuffer';
	xhr.onprogress = function(event) {
		if (onprogress)
			onprogress(event);
		if (CompressionState.current == CompressionState.Pending)
		{
			if (xhr.status == 0 || xhr.status == 200)
				CompressionState.Set(CompressionState.Supported);
			else
				CompressionState.Set(CompressionState.Unsupported);			
		}
	};
	xhr.onload = function() {
		if (xhr.status == 0 || xhr.status == 200)
		{
			CompressionState.Set(CompressionState.Supported);
			var byteArray = new Uint8Array(xhr.response);
			onload(byteArray);  
		}
		else
		{
			// server is not setup for serving compressed files
			CompressionState.Set(CompressionState.Unsupported);
			DecompressAndLoadFile(url, onload, onprogress);
		}
	};

	xhr.onerror = function() {
		// when using file:// protocol, onerror callback may be called if the file does not exist
		CompressionState.Set(CompressionState.Unsupported);
		DecompressAndLoadFile(url, onload, onprogress);
	};

	try {
		xhr.send(null);
	}
	catch (err)
	{
		// when using file:// protocol, send may throw an exception if the file does not exist
		CompressionState.Set(CompressionState.Unsupported);
		DecompressAndLoadFile(url, onload, onprogress);
	}
}

function LoadCompressedJS(url, onload, blobInfo)
{
	LoadCompressedFile (url, function(response)
	{
		if (blobInfo)
			blobInfo.url = url;
		LoadJSCode (response, onload, blobInfo);
	});
}

Module["memoryInitializerRequest"]={
	status: -1,
	response: null, 
	callback: null, 
	addEventListener: function(type, callback)
	{
		if (type != 'load')
			throw "Unexpected type " + type;

		this.callback = callback;
	}
};

function fetchRemotePackageWrapper (packageName, packageSize, callback, errback)
{
	LoadCompressedFile(packageName, function proxyCallback(data) { callback(data.buffer); }, function(event) {
		var url = packageName;
		var size = packageSize;
		if (event.total) size = event.total;
		if (event.loaded) {
			if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
			Module.dataFileDownloads[url] = {
				loaded: event.loaded,
				total: size
			};
			var total = 0;
			var loaded = 0;
			var num = 0;
			for (var download in Module.dataFileDownloads) {
				var data = Module.dataFileDownloads[download];
				total += data.total;
				loaded += data.loaded;
				num++;
			}
			total = Math.ceil(total * Module.expectedDataFileDownloads/num);
			if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
			} else if (!Module.dataFileDownloads) {
			if (Module['setStatus']) Module['setStatus']('Downloading data...');
		}
	});
}

// Kick off actual loads.
function SetIndexedDBAndLoadCompressedJS(idb) {
  if (SetIndexedDBAndLoadCompressedJS.called)
    return;
  SetIndexedDBAndLoadCompressedJS.called = true;
  Module.indexedDB = idb;  
  if (Module["wasmBinaryFile"] && typeof Wasm === "object")
  {
    LoadCompressedFile (Module["wasmBinaryFile"], function(response) {
	  Module.wasmBinary = response;
      LoadCompressedJS(Module["codeUrl"], null, {id: "codeUrl"});
    });
  } 
  else
  { 
    LoadCompressedJS(Module["asmUrl"], function() {
      LoadCompressedJS(Module["codeUrl"], null, {id: "codeUrl"});
    }, {id: "asmUrl"});
  }
}

function LoadCode() {
	try {
	  var idb = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	  var testRequest = idb.open("/idbfs-test");
	  testRequest.onerror = function(e) { e.preventDefault(); SetIndexedDBAndLoadCompressedJS(); }
	  testRequest.onsuccess = function() { testRequest.result.close(); SetIndexedDBAndLoadCompressedJS(idb); }
	  setTimeout(function() { SetIndexedDBAndLoadCompressedJS(); }, 1000);
	} catch (e) {
	  SetIndexedDBAndLoadCompressedJS();
	}
}

LoadCompressedFile (Module["memUrl"], function(response) {
	Module["memoryInitializerRequest"].status = 200; // success
	Module["memoryInitializerRequest"].response = response;
	if (Module["memoryInitializerRequest"].callback)
	  Module["memoryInitializerRequest"].callback();
});

LoadCode();




var Module;

if (typeof Module === 'undefined') Module = eval('(function() { try { return Module || {} } catch(e) { return {} } })()');

if (!Module.expectedDataFileDownloads) {
  Module.expectedDataFileDownloads = 0;
  Module.finishedDataFileDownloads = 0;
}
Module.expectedDataFileDownloads++;
(function() {
 var loadPackage = function(metadata) {

    var PACKAGE_PATH;
    if (typeof window === 'object') {
      PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
    } else if (typeof location !== 'undefined') {
      // worker
      PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
    } else {
      throw 'using preloaded data can only be done on a web page or in a web worker';
    }
    var PACKAGE_NAME = 'build.data';
    var REMOTE_PACKAGE_BASE = 'build.data';
    if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
      Module['locateFile'] = Module['locateFilePackage'];
      Module.printErr('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
    }
    var REMOTE_PACKAGE_NAME = typeof Module['locateFile'] === 'function' ?
                              Module['locateFile'](REMOTE_PACKAGE_BASE) :
                              ((Module['filePackagePrefixURL'] || '') + REMOTE_PACKAGE_BASE);
  
    var REMOTE_PACKAGE_SIZE = metadata.remote_package_size;
    var PACKAGE_UUID = metadata.package_uuid;
  
    function fetchRemotePackage(packageName, packageSize, callback, errback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', packageName, true);
      xhr.responseType = 'arraybuffer';
      xhr.onprogress = function(event) {
        var url = packageName;
        var size = packageSize;
        if (event.total) size = event.total;
        if (event.loaded) {
          if (!xhr.addedTotal) {
            xhr.addedTotal = true;
            if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
            Module.dataFileDownloads[url] = {
              loaded: event.loaded,
              total: size
            };
          } else {
            Module.dataFileDownloads[url].loaded = event.loaded;
          }
          var total = 0;
          var loaded = 0;
          var num = 0;
          for (var download in Module.dataFileDownloads) {
          var data = Module.dataFileDownloads[download];
            total += data.total;
            loaded += data.loaded;
            num++;
          }
          total = Math.ceil(total * Module.expectedDataFileDownloads/num);
          if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
        } else if (!Module.dataFileDownloads) {
          if (Module['setStatus']) Module['setStatus']('Downloading data...');
        }
      };
      xhr.onerror = function(event) {
        throw new Error("NetworkError for: " + packageName);
      }
      xhr.onload = function(event) {
        if (xhr.status == 200 || xhr.status == 304 || xhr.status == 206 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
          var packageData = xhr.response;
          callback(packageData);
        } else {
          throw new Error(xhr.statusText + " : " + xhr.responseURL);
        }
      };
      xhr.send(null);
    };

    function handleError(error) {
      console.error('package error:', error);
    };
  
      var fetched = null, fetchedCallback = null;
      fetchRemotePackageWrapper(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);
    
  function runWithFS() {

    function assert(check, msg) {
      if (!check) throw msg + new Error().stack;
    }
Module['FS_createPath']('/', 'Il2CppData', true, true);
Module['FS_createPath']('/Il2CppData', 'Metadata', true, true);
Module['FS_createPath']('/', 'Resources', true, true);
Module['FS_createPath']('/', 'Managed', true, true);
Module['FS_createPath']('/Managed', 'mono', true, true);
Module['FS_createPath']('/Managed/mono', '2.0', true, true);

    function DataRequest(start, end, crunched, audio) {
      this.start = start;
      this.end = end;
      this.crunched = crunched;
      this.audio = audio;
    }
    DataRequest.prototype = {
      requests: {},
      open: function(mode, name) {
        this.name = name;
        this.requests[name] = this;
        Module['addRunDependency']('fp ' + this.name);
      },
      send: function() {},
      onload: function() {
        var byteArray = this.byteArray.subarray(this.start, this.end);

          this.finish(byteArray);

      },
      finish: function(byteArray) {
        var that = this;

        Module['FS_createDataFile'](this.name, null, byteArray, true, true, true); // canOwn this data in the filesystem, it is a slide into the heap that will never change
        Module['removeRunDependency']('fp ' + that.name);

        this.requests[this.name] = null;
      }
    };

        var files = metadata.files;
        for (i = 0; i < files.length; ++i) {
          new DataRequest(files[i].start, files[i].end, files[i].crunched, files[i].audio).open('GET', files[i].filename);
        }

  
    function processPackageData(arrayBuffer) {
      Module.finishedDataFileDownloads++;
      assert(arrayBuffer, 'Loading data file failed.');
      assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
      var byteArray = new Uint8Array(arrayBuffer);
      var curr;
      
        // Reuse the bytearray from the XHR as the source for file reads.
        DataRequest.prototype.byteArray = byteArray;
  
          var files = metadata.files;
          for (i = 0; i < files.length; ++i) {
            DataRequest.prototype.requests[files[i].filename].onload();
          }
              Module['removeRunDependency']('datafile_build.data');

    };
    Module['addRunDependency']('datafile_build.data');
  
    if (!Module.preloadResults) Module.preloadResults = {};
  
      Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }
    
  }
  if (Module['calledRun']) {
    runWithFS();
  } else {
    if (!Module['preRun']) Module['preRun'] = [];
    Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
  }

 }
 loadPackage({"files": [{"audio": 0, "start": 0, "crunched": 0, "end": 3401000, "filename": "/data.unity3d"}, {"audio": 0, "start": 3401000, "crunched": 0, "end": 3401019, "filename": "/methods_pointedto_by_uievents.xml"}, {"audio": 0, "start": 3401019, "crunched": 0, "end": 3406731, "filename": "/preserved_derived_types.xml"}, {"audio": 0, "start": 3406731, "crunched": 0, "end": 6392163, "filename": "/Il2CppData/Metadata/global-metadata.dat"}, {"audio": 0, "start": 6392163, "crunched": 0, "end": 7126311, "filename": "/Resources/unity_default_resources"}, {"audio": 0, "start": 7126311, "crunched": 0, "end": 7153936, "filename": "/Managed/mono/2.0/machine.config"}], "remote_package_size": 7153936, "package_uuid": "2a9f5a40-141a-4047-8adb-f29d3538d14f"});

})();
