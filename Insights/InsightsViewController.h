//
//  InsightsViewController.h
//  Insights
//
//  Created by Momchil Tomov on 8/18/12.
//  Copyright (c) 2012 Princeton University. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface InsightsViewController : UIViewController <UITextViewDelegate>
@property (weak, nonatomic) IBOutlet UITextView *insight;

- (IBAction)clearInsight:(id)sender;
- (IBAction)clickBackground:(id)sender;
- (IBAction)clickDoneInsight:(id)sender;

@end
