# UnityLearn SpaceShooter PlayMaker

This is a 100% PlayMaker of [SpaceShooter learning Project](https://www.assetstore.unity3d.com/en/#!/content/13866)

##Description


You need the following setup:

- [Unity](https://unity3d.com/) 5.5 at least  
- [PlayMaker](https://www.assetstore.unity3d.com/en/#!/content/368) 1.8.3

**Download**
You either clone this repository, or download the Test package directly (Coming soon)

Improvments over the original version:  
* Leak with Asteroids and Ennemies  
	The original version is badly setup for destroying ennemies and asteroids and so gameobjects are not cleaned up properly leading to a memory leak. It's not critical because it gets reseted when you loose but nonetheless better without.
	

##100% PlayMaker WebGL

Test where done using Firefox, which gave better results than with Chrome

- Build Size (the Release folder): 10.2 Mb 
- Mem total : 7.11 MB
- Mem Alloc : 5.29 MB
- FPS AVG: 58  

You can play this version [here](http://fabrejean.net/projects/PlayMaker/SpaceShooter_PlayMaker/)

##100% scripted WebGl

This is the original untouched version ( I removed the tutorial information though).

- Build Size (the Release folder): 9.2 Mb
- Mem total : 6.92 MB
- Mem Alloc : 5.14 MB
- FPS AVG: 59  

You can play this version [here](http://fabrejean.net/projects/PlayMaker/SpaceShooter_Original/)


**Notes**:

The results are very good :)

- 1MB more for the build size is the cost of the PlayMaker framework which is totally acceptable.  
- Around 0.2Mb more memory allocated is really impressive, it just shows that PlayMaker internal framework is very small set of classes with a very small footprint.
- Average FrameRate is at least 1 frame lower, which is totally acceptable too.
