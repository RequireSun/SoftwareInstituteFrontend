define(['react', 'view/public', 'action/news'], function (React, templatePublic, actionNews) {
    var TitleLine = templatePublic.TitleLine,
        Shortcut = templatePublic.Shortcut;
    var Detail = React.createClass({
        getInitialState: function () {
            return {
                newsId: this.props.params.newsId,
                title: '',
                supervisorName: '',
                article: '',
                updateTime: '',
                pageView: 0
            };
        },
        componentWillReceiveProps: function (nextProps) {
            this.setState({
                newsId: nextProps.newsId,
                title: nextProps.title,
                supervisorName: nextProps.supervisorName,
                article: nextProps.article,
                updateTime: nextProps.updateTime,
                pageView: nextProps.pageView
            });
        },
        componentWillMount: function () {
            if (!this.state.newsId) {
                location.hash = '#notFound/请输入正确的新闻 ID！';
                return ;
            }
            actionNews.NewsDetail(function (err, data) {
                if (err) {
                    location.hash = '#notFound/' + err;
                    return ;
                }
                this.setState({
                    title: data.title,
                    supervisorName: data.supervisor_name,
                    article: data.article,
                    updateTime: data.update_time,
                    pageView: data.page_view
                });
            }.bind(this), this.state.newsId);
        },
        render: function () {
            return (
                <div>
                    <Shortcut/>
                    <TitleLine title={this.state.title}/>
                    <p>发布者 {this.state.supervisorName} 发布时间 {this.state.updateTime} 浏览量 {this.state.pageView}</p>
                    <article>{this.state.article}</article>
                </div>
            );
        }
    });
    return Detail;
});