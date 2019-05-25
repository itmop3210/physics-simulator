# PhysicsSimulator2
Physics project. This one uses Apache Cordova

## Getting started
1. Clone project

```git clone https://github.com/itmop3210/PhysicsSimulator2.git```

```cd PhysicsSimulator2```

2. Install Cordova

```npm install -g cordova```

## Opening project in browser
```cordova run browser```

_It seems there is no hot-reload when you change some code. To apply changes, you need to press CTRL+C, then run command above one more time._

## Opening on an Android device
[Full guide here](https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html)

### TL DR:

- Install Android Studio, it will install required SDKs automatically

- Make sure JAVA_HOME environment variable points to your JDK installation

- Make sure ANDROID_HOME environment variable points to your SDK installation

- Enable developer mode and USB debugging on your Android phone

- Connect your Android phone via USB


### Build app:
```cordova build android```

### Run app:
```cordova run android```

## Starting to develop
1. Open ```/www``` directory

2. Create .html file for your demonstration. You can use ```geom_optics.html``` as an example.

3. Add a link to your demonstration in ```index.html``` file.
