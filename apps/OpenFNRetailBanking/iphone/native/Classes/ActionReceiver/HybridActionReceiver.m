//
//  HybridActionReceiver.m
//

#import "HybridActionReceiver.h"
#import <IBMMobileFirstPlatformFoundationHybrid/IBMMobileFirstPlatformFoundationHybrid.h>


@implementation HybridActionReceiver

-(void)onActionReceived:(NSString *)action withData:(NSDictionary *)data{
    
    // process received action
    NSLog(@"onActionReceived::start");
    
    if(self.watsonSpeech == nil){
        self.watsonSpeech = [[WatsonSpeech alloc] init];
    }
    
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
        localNotification.category = @"LaunchTravelApp";
        
        [[UIApplication sharedApplication] scheduleLocalNotification:localNotification];
        
    
    }else if ([action isEqualToString:@"textToSpeechStart"]){
        NSString * text = [data objectForKey:@"text"];
        NSString * username = [data objectForKey:@"username"];
        NSString * password = [data objectForKey:@"password"];
        NSString * url = [data objectForKey:@"url"];
        
        NSLog(@"textToSpeech:: text=%@", text);
        
        [self.watsonSpeech textToSpeechStartWithText:text username:username password:password url:url];
        
        
    }else if ([action isEqualToString:@"textToSpeechStop"]){
        
        NSLog(@"textToSpeech:: stop");
        
        [self.watsonSpeech textToSpeechStop];
        
    }else if ([action isEqualToString:@"speechToTextStart"]){
        
        NSString * username = [data objectForKey:@"username"];
        NSString * password = [data objectForKey:@"password"];
        NSString * url = [data objectForKey:@"url"];
        
        NSLog(@"speechToTextStart::");
        
        [self.watsonSpeech  startRecordingWithUsername:username password:password url:url sendText: ^(NSString *transcribedText, NSString *endOfSpeech){
            if([endOfSpeech isEqualToString:@"endOfSpeechDetected"]){
                NSMutableDictionary *data = [[NSMutableDictionary alloc] init];
                [data setValue:@"true" forKey:@"endOfSpeechDetected"];
                [[WL sharedInstance] sendActionToJS:@"endOfSpeech" withData:data];
            }else if([endOfSpeech isEqualToString:@"networkError"]){
                NSMutableDictionary *data = [[NSMutableDictionary alloc] init];
                [data setValue:@"true" forKey:@"networkError"];
                [[WL sharedInstance] sendActionToJS:@"endOfSpeech" withData:data];
            }else if([endOfSpeech isEqualToString:@"otherError"]){
                NSMutableDictionary *data = [[NSMutableDictionary alloc] init];
                [data setValue:@"true" forKey:@"otherError"];
                [[WL sharedInstance] sendActionToJS:@"endOfSpeech" withData:data];
            }else{
                NSMutableDictionary *data = [[NSMutableDictionary alloc] init];
                [data setValue:transcribedText forKey:@"transcribedText"];
                
                [[WL sharedInstance] sendActionToJS:@"receivedInputText" withData:data];
            }
        }];
        
        
    }else if ([action isEqualToString:@"speechToTextStop"]){
        
        NSLog(@"speechToTextStop::");
        
        [self.watsonSpeech stopRecording];
        
    }
    
    NSLog(@"onActionReceived::end");
}


@end
