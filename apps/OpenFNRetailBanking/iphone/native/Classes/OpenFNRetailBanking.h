//
//  MyAppDelegate.h
//
//

#import <IBMMobileFirstPlatformFoundationHybrid/IBMMobileFirstPlatformFoundationHybrid.h>
#import "HybridActionReceiver.h"

@interface MyAppDelegate : WLAppDelegate <WLInitWebFrameworkDelegate> {
    
}
@property(nonatomic, strong) HybridActionReceiver *hybridActionReceiver;
@property(nonatomic, strong) NSMutableDictionary *deviceCredentials;



@end
