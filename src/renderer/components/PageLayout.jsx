const PageLayout = ({ children }) => {
    return (
        <div className="out-off-page-background d-flex flex-column justify-content-center align-items-center vh-100">
            <div className="default-box page-background rounded-4 d-flex flex-column">
                {children}
            </div>
        </div>
    );
};

export default PageLayout;
