//
//  RootViewController.m
//  SimpleWebJavaScripe
//
//  Created by fido dido on 14-9-9.
//  Copyright (c) 2014年 joker. All rights reserved.
//

#import "RootViewController.h"

@interface RootViewController ()
{
    UIWebView *_webView;
}
@end

@implementation RootViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    //获取本地路径 供程序使用

    _webView = [[UIWebView alloc]initWithFrame:self.view.bounds];
    [self.view addSubview:_webView];
    
    //装载方式 请求方式 由于有中文要使用UTF8，但是一些资源文件无法加载
    //最简单的加载方式，要求无相对路径
    //NSString *htmlPath = [[NSBundle mainBundle] pathForResource:@"index" ofType:@"html"];
    NSString *htmlPath = [[[[NSBundle mainBundle] resourcePath] stringByAppendingPathComponent:@"html"] stringByAppendingPathComponent:@"index.html"];
    NSURLRequest *request = [NSURLRequest requestWithURL:[NSURL URLWithString:[htmlPath stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]]];
    [_webView loadRequest:request];
    
    //装载方式 数据加载方式1
    //拖入文件夹要保持相对路径，首先要使用英文路径，其次拖入时选择第二项add any folder，最后还要把文件夹路径写完整 @“html”
//    NSString *path = [[[NSBundle mainBundle] resourcePath] stringByAppendingPathComponent:@"html"];
//    NSString *htmlStr = [[NSString alloc] initWithContentsOfFile:htmlPath encoding:NSUTF8StringEncoding error:nil];
//    [_webView loadHTMLString:htmlStr baseURL:[NSURL fileURLWithPath:path ]];
    
    //装载方式 数据加载方式2
    //针对本地不同编码的html进行解码，MIME ,ENCODING均在网页源码可以查到，编辑方式有 utf-16,utf-8,GBK等
//    NSData *htmlData = [NSData dataWithContentsOfFile:htmlPath];
//    [_webView loadData:htmlData MIMEType:@"text/html"textEncodingName:@"utf-8" baseURL:[NSURL fileURLWithPath:path]];

}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
