//
//  HybridActionReceiver.m
//
#import <LocalAuthentication/LocalAuthentication.h>

#import "HybridActionReceiver.h"
#import <IBMMobileFirstPlatformFoundationHybrid/IBMMobileFirstPlatformFoundationHybrid.h>


@implementation HybridActionReceiver

-(void)onActionReceived:(NSString *)action withData:(NSDictionary *)data{
    
    // process received action
    NSLog(@"onActionReceived::start");
    
    if ([action isEqualToString:@"scheduleNotification"]){
    
        NSString * msg = [data objectForKey:@"message"];
        NSNumber *duration = [data objectForKey:@"duration"];
        
        NSLog(@"msg=%@, duration=%d",msg,[duration intValue]);
        
        UILocalNotification* localNotification = [[UILocalNotification alloc] init];
        localNotification.fireDate = [NSDate dateWithTimeIntervalSinceNow:[duration intValue]];
        localNotification.alertBody = msg;
        localNotification.timeZone = [NSTimeZone defaultTimeZone];
        localNotification.soundName = UILocalNotificationDefaultSoundName;
        localNotification.applicationIconBadgeNumber = 1;
        [[UIApplication sharedApplication] scheduleLocalNotification:localNotification];
        
    
    }else if([action isEqualToString:@"touchIDLogin"]){
        
        //TouchID auth
        LAContext *context = [[LAContext alloc] init];
        context.localizedFallbackTitle = @"";
        NSError *error = nil;
        
        if ([context canEvaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics error:&error]) {
            
            // Authenticate User
            [context evaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics
                    localizedReason:@"Verify using TouchID"
                              reply:^(BOOL success, NSError *error) {
                                  
                                  if (error) {
                                      
                                      NSMutableDictionary *data = [[NSMutableDictionary alloc] init];
                                      [data setValue:@"failure" forKey:@"result"];
                                      [[WL sharedInstance] sendActionToJS:@"touchIDResult" withData:data];
                                  }
                                  
                                  if (success) {
                                      NSMutableDictionary *data = [[NSMutableDictionary alloc] init];
                                      [data setValue:@"success" forKey:@"result"];
                                      [[WL sharedInstance] sendActionToJS:@"touchIDResult" withData:data];
                                      
                                  } else {
                                      NSMutableDictionary *data = [[NSMutableDictionary alloc] init];
                                      [data setValue:@"cancelled" forKey:@"result"];
                                      [[WL sharedInstance] sendActionToJS:@"touchIDResult" withData:data];
                                  }
                                  
                              }];
            
            
        } else {
            
            NSMutableDictionary *data = [[NSMutableDictionary alloc] init];
            [data setValue:@"touchidUnavailable" forKey:@"result"];
            [[WL sharedInstance] sendActionToJS:@"touchIDResult" withData:data];
            
        }
        
    }
    NSLog(@"onActionReceived::end");
}


@end
