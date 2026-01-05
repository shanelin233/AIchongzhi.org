#!/bin/bash
# 百度链接提交脚本
# 使用方法: ./scripts/baidu-push.sh [url1] [url2] ...
# 如果不传参数，会推送 sitemap 中的所有 URL

# 注意：百度站点配置的是 www.aichongzhi.org
BAIDU_API="http://data.zz.baidu.com/urls?site=https://www.aichongzhi.org&token=qNj6GK15nD54UK5K"

# 如果传入了参数，使用参数作为 URL 列表
if [ $# -gt 0 ]; then
    URLS="$@"
else
    # 否则从 sitemap.xml 提取所有 URL
    echo "从 sitemap.xml 提取 URL..."
    URLS=$(grep -oP '(?<=<loc>)[^<]+' sitemap.xml 2>/dev/null || grep -o '<loc>[^<]*</loc>' sitemap.xml | sed 's/<[^>]*>//g')
fi

# 创建临时文件存放 URL，并转换为 www 版本
TEMP_FILE=$(mktemp)
for url in $URLS; do
    # 将 https://aichongzhi.org 转换为 https://www.aichongzhi.org
    www_url=$(echo "$url" | sed 's|https://aichongzhi.org|https://www.aichongzhi.org|g')
    echo "$www_url" >> "$TEMP_FILE"
done

# 显示将要推送的 URL
echo "准备推送以下 URL 到百度:"
cat "$TEMP_FILE"
echo ""

# 调用百度 API
echo "正在推送到百度..."
RESPONSE=$(curl -s -H 'Content-Type:text/plain' --data-binary @"$TEMP_FILE" "$BAIDU_API")

echo "百度 API 响应:"
echo "$RESPONSE"

# 清理临时文件
rm -f "$TEMP_FILE"

# 检查响应
if echo "$RESPONSE" | grep -q '"success"'; then
    echo ""
    echo "✅ 推送成功!"
    exit 0
else
    echo ""
    echo "⚠️ 推送可能有问题，请检查响应"
    exit 1
fi
