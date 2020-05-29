FROM patarapolw/remark42:dev
EXPOSE 8080
# EXPOSE 8443
CMD ["/srv/remark42", "server"]