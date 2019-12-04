//
//  MyAppDelegate.m
//  OpenFNRetailBanking
//
//

#import "OpenFNRetailBanking.h"
#import <IBMMobileFirstPlatformFoundationHybrid/IBMMobileFirstPlatformFoundationHybrid.h>
#import "Cordova/CDVViewController.h"


@implementation MyAppDelegate

UIBackgroundTaskIdentifier *bgTask;

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions 
{
	BOOL result = [super application:application didFinishLaunchingWithOptions:launchOptions];
    
    // A root view controller must be created in application:didFinishLaunchingWithOptions:  
	self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
    UIViewController* rootViewController = [[UIViewController alloc] init];     
    
    [self.window setRootViewController:rootViewController];
    [self.window makeKeyAndVisible];
   
    [[WL sharedInstance] showSplashScreen];
    // By default splash screen will be automatically hidden once Worklight JavaScript framework is complete. 
	// To override this behaviour set autoHideSplash property in initOptions.js to false and use WL.App.hideSplashScreen() API.
    
    //Initialize the native action receiver
    self.hybridActionReceiver = [[HybridActionReceiver alloc] init];
    [[WL sharedInstance] addActionReceiver:self.hybridActionReceiver];
    
    UIMutableUserNotificationAction *informAction = [[UIMutableUserNotificationAction alloc] init];
    informAction.identifier = @"OPENTRAVELAPP_IDENTIFIER";
    informAction.title = @"See Travel Packages";
    informAction.activationMode = UIUserNotificationActivationModeForeground;
    informAction.destructive = false;
    informAction.authenticationRequired = false;
    
    UIMutableUserNotificationCategory *category = [[UIMutableUserNotificationCategory alloc] init];
    category.identifier = @"LaunchTravelApp";
    [category setActions:@[informAction] forContext:UIUserNotificationActionContextDefault];
    
    NSSet *categories = [NSSet setWithObjects:category, nil];
    
    UIUserNotificationType types = UIUserNotificationTypeBadge | UIUserNotificationTypeSound | UIUserNotificationTypeAlert;
    UIUserNotificationSettings *settings = [UIUserNotificationSettings settingsForTypes:types categories:categories];
    if ([UIApplication instancesRespondToSelector:@selector(registerUserNotificationSettings:)]){
        [[UIApplication sharedApplication] registerUserNotificationSettings:settings];
        [[UIApplication sharedApplication] registerForRemoteNotifications];
    }else{
        [[UIApplication sharedApplication] registerForRemoteNotificationTypes:
         (UIUserNotificationTypeBadge | UIUserNotificationTypeSound | UIUserNotificationTypeAlert)];
    }
    
    [[WL sharedInstance] initializeWebFrameworkWithDelegate:self];
    
    return result;
}

// This method is called after the WL web framework initialization is complete and web resources are ready to be used.
-(void)wlInitWebFrameworkDidCompleteWithResult:(WLWebFrameworkInitResult *)result
{
    if ([result statusCode] == WLWebFrameworkInitResultSuccess) {
        [self wlInitDidCompleteSuccessfully];
    } else {
        [self wlInitDidFailWithResult:result];
    }
}

-(void)wlInitDidCompleteSuccessfully
{
    UIViewController* rootViewController = self.window.rootViewController;

    // Create a Cordova View Controller
    CDVViewController* cordovaViewController = [[CDVViewController alloc] init] ;

    cordovaViewController.startPage = [[WL sharedInstance] mainHtmlFilePath];
     
    // Adjust the Cordova view controller view frame to match its parent view bounds
    cordovaViewController.view.frame = rootViewController.view.bounds;

	// Display the Cordova view
    [rootViewController addChildViewController:cordovaViewController];  
    [rootViewController.view addSubview:cordovaViewController.view];
    [cordovaViewController didMoveToParentViewController:rootViewController];
    
    [[WL sharedInstance] sendActionToJS:@"setDeviceCredentials" withData:self.deviceCredentials];
}

-(void)wlInitDidFailWithResult:(WLWebFrameworkInitResult *)result
{
    UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:@"ERROR"
                                                  message:[result message]
                                                  delegate:self
                                                  cancelButtonTitle:@"OK"
                                                  otherButtonTitles:nil];
    [alertView show];
}


- (void)applicationWillResignActive:(UIApplication *)application
{
    // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
    // Use this method to pause ongoing tasks, disable timers, and throttle down OpenGL ES frame rates. Games should use this method to pause the game.
}

- (void)applicationDidEnterBackground:(UIApplication *)application
{
    // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later. 
    // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
}

- (void)applicationWillEnterForeground:(UIApplication *)application
{
    // Called as part of the transition from the background to the inactive state; here you can undo many of the changes made on entering the background.
}

- (void)applicationDidBecomeActive:(UIApplication *)application
{
    // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
}

- (void)applicationWillTerminate:(UIApplication *)application
{
    // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
}

- (void)application:(UIApplication *)application handleActionWithIdentifier:(NSString *)identifier forLocalNotification:(UILocalNotification *)notification completionHandler:(void (^)())completionHandler
{
    
    if (identifier!=nil && [identifier isEqualToString:@"OPENTRAVELAPP_IDENTIFIER"])
    {
        [[WL sharedInstance] sendActionToJS:@"redirectingToTravelApp" withData:nil];
        NSLog(@"Launch the travel app");
        [application openURL:[NSURL URLWithString:@"opentravel://opentravelapp/search"]];
       
        NSLog(@"Done launching");
    }
    
    completionHandler();
}



-( void) application:( UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:( NSData *)deviceToken{
    
    
    NSUUID *uniqueIdentifier = [[UIDevice currentDevice] identifierForVendor];
    
    NSString *token = [[deviceToken description] stringByTrimmingCharactersInSet: [NSCharacterSet characterSetWithCharactersInString:@"<>"]];
    token = [token stringByReplacingOccurrencesOfString:@" " withString:@""];
    NSLog(@"token=%@", token);
    NSLog(@"deviceId=%@",uniqueIdentifier.UUIDString);
    NSMutableDictionary *data = [[NSMutableDictionary alloc] init];
    [data setValue:token forKey:@"deviceToken"];
    [data setValue:uniqueIdentifier.UUIDString forKey:@"deviceId"];
    
    self.deviceCredentials = data;
    
    
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo{
    NSLog(@"didReceiveRemoteNotification");
    [[WL sharedInstance] sendActionToJS:@"receivedLocationUpdate" withData:nil];
    
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult result))completionHandler {
    NSLog(@"didReceiveRemoteNotification:: ");
    [[WL sharedInstance] sendActionToJS:@"receivedLocationUpdate" withData:nil];
    

}


-(BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation{
    
    if([[url host] isEqualToString:@"openfncieapp"]){
        if([[url path] isEqualToString:@"/launch"]){ //launch conversation for offers
            NSURLComponents *nsUrlComponents = [[NSURLComponents alloc] initWithURL:url resolvingAgainstBaseURL:NO];
            NSMutableDictionary *data = [[NSMutableDictionary alloc] init];
            [data setValue:nsUrlComponents.query forKey:@"queryStr"];
            [[WL sharedInstance] sendActionToJS:@"offers" withData:data];
        }else{
            //get query parameters
            NSURLComponents *nsUrlComponents = [[NSURLComponents alloc] initWithURL:url resolvingAgainstBaseURL:NO];
            //NSLog(@"query=%@",nsUrlComponents.query);
            //NSLog(@"absoluteString=%@",url.absoluteString);
            
            NSMutableDictionary *data = [[NSMutableDictionary alloc] init];
            [data setValue:nsUrlComponents.query forKey:@"queryStr"];
            [[WL sharedInstance] sendActionToJS:@"payment" withData:data];
        }
        
        /*else if([[url path] isEqualToString:@"/payment"]){
         //get query parameters
         NSURLComponents *nsUrlComponents = [[NSURLComponents alloc] initWithURL:url resolvingAgainstBaseURL:NO];
         NSLog(@"query=%@",nsUrlComponents.query);
         NSLog(@"absoluteString=%@",url.absoluteString);
         //TODO split with delmiter "."
         
         
         //TODO decode using base64
         
         
         NSMutableDictionary *data = [[NSMutableDictionary alloc] init];
         [data setValue:@"queryStr" forKey:@"queryStr"];
         [[WL sharedInstance] sendActionToJS:@"payment" withData:data];
         }*/
        
        return YES;
    }
}

@end
