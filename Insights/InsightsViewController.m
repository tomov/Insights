//
//  InsightsViewController.m
//  Insights
//
//  Created by Momchil Tomov on 8/18/12.
//  Copyright (c) 2012 Princeton University. All rights reserved.
//

#import "InsightsViewController.h"

@implementation InsightsViewController
@synthesize insight;

#pragma mark - UI

- (IBAction)clearInsight:(id)sender 
{
    insight.text = @"";
}

- (IBAction)clickBackground:(id)sender
{
    [insight resignFirstResponder];
}

- (IBAction)clickDoneInsight:(id)sender
{
    [sender resignFirstResponder];
}

- (BOOL)textView:(UITextView *)textView shouldChangeTextInRange:(NSRange)range replacementText:(NSString *)text
{
    if ([text isEqualToString:@"\n"]) {
        [textView resignFirstResponder];
        return NO;
    }
    return YES;
}

- (IBAction)saveInsight:(id)sender {
    // Create the request.
    NSMutableURLRequest *theRequest=[NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"http://localhost:5000/addinsight"]
                                              cachePolicy:NSURLRequestUseProtocolCachePolicy
                                          timeoutInterval:60.0];
    NSString *postString = insight.text;
    NSData *theFuckedUpBodyData = [postString dataUsingEncoding:NSUTF8StringEncoding allowLossyConversion:YES];
    [theRequest setHTTPMethod: @"POST"];
    [theRequest setValue:@"application/x-www-form-urlencoded" forHTTPHeaderField:@"Content-Type"];
    [theRequest setValue:[NSString stringWithFormat:@"%d", [theFuckedUpBodyData length]] forHTTPHeaderField:@"Content-Length"];
    [theRequest setHTTPBody:theFuckedUpBodyData];
    
    // create the connection with the request
    // and start loading the data
    NSURLConnection *theConnection=[[NSURLConnection alloc] initWithRequest:theRequest delegate:self];
    if (theConnection) {
        // Create the NSMutableData to hold the received data.
        // receivedData is an instance variable declared elsewhere.
        NSData *receivedData = [NSMutableData data];
    } else {
        // Inform the user that the connection failed.
    }
}

#pragma mark - Xcode default shits

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Release any cached data, images, etc that aren't in use.
}

#pragma mark - View lifecycle

- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.
}

- (void)viewDidUnload
{
    [self setInsight:nil];
    [self setInsight:nil];
    [self setInsight:nil];
    [super viewDidUnload];
    // Release any retained subviews of the main view.
    // e.g. self.myOutlet = nil;
}

- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
}

- (void)viewDidAppear:(BOOL)animated
{
    [super viewDidAppear:animated];
}

- (void)viewWillDisappear:(BOOL)animated
{
	[super viewWillDisappear:animated];
}

- (void)viewDidDisappear:(BOOL)animated
{
	[super viewDidDisappear:animated];
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    // Return YES for supported orientations
    return (interfaceOrientation != UIInterfaceOrientationPortraitUpsideDown);
}

@end
