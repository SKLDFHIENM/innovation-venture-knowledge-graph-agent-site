/**
 * 创新创业课程知识图谱智能体 (IEKG) - 异步数据加载器
 * 实现动静分离，按需/延迟异步 Fetch 加载 JSON 配置文件并实施缓存
 */
(function() {
    window.IEKG = window.IEKG || {};
    window.IEKG.data = window.IEKG.data || {};

    let detailsCache = null;
    let loadingPromise = null;

    /**
     * 异步获取全量节点导学大纲数据
     * @returns {Promise<Object>}
     */
    async function loadDetails() {
        if (detailsCache) {
            return detailsCache;
        }

        // 如果旧版全局变量 window.KNOWLEDGE_DETAILS 已存在非空对象，直接使用
        if (window.KNOWLEDGE_DETAILS && Object.keys(window.KNOWLEDGE_DETAILS).length > 0) {
            detailsCache = window.KNOWLEDGE_DETAILS;
            return detailsCache;
        }

        if (loadingPromise) {
            return loadingPromise;
        }

        const jsonUrl = (window.IEKG.config && window.IEKG.config.detailsJsonPath) || 'data/data_details.json';

        loadingPromise = (async () => {
            try {
                const response = await fetch(jsonUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                detailsCache = data;
                // 同步挂载到全局变量供老代码兜底访问
                window.KNOWLEDGE_DETAILS = window.KNOWLEDGE_DETAILS || {};
                Object.assign(window.KNOWLEDGE_DETAILS, data);
                return detailsCache;
            } catch (err) {
                console.warn('[IEKG Data] Fetch JSON 无法直接获取 (可能出于 file:// CORS 限制)，自动降级尝试本地预载数据:', err);
                if (window.KNOWLEDGE_DETAILS && Object.keys(window.KNOWLEDGE_DETAILS).length > 0) {
                    detailsCache = window.KNOWLEDGE_DETAILS;
                    return detailsCache;
                }
                // 兜底返回空对象防止报错
                detailsCache = {};
                return detailsCache;
            } finally {
                loadingPromise = null;
            }
        })();

        return loadingPromise;
    }

    /**
     * 获取指定 ID 的节点详情数据
     * @param {string|number} nodeId 节点ID
     * @returns {Promise<Object|null>}
     */
    async function getNodeDetails(nodeId) {
        const allData = await loadDetails();
        return allData[String(nodeId)] || null;
    }

    /**
     * 同步获取节点详情数据（从缓存读取，若尚未载入则尝试获取 window.KNOWLEDGE_DETAILS）
     * @param {string|number} nodeId 
     */
    function getNodeDetailsSync(nodeId) {
        const idStr = String(nodeId);
        if (detailsCache && detailsCache[idStr]) {
            return detailsCache[idStr];
        }
        if (window.KNOWLEDGE_DETAILS && window.KNOWLEDGE_DETAILS[idStr]) {
            return window.KNOWLEDGE_DETAILS[idStr];
        }
        return null;
    }

    // 挂载至命名空间
    window.IEKG.data.loadDetails = loadDetails;
    window.IEKG.data.getNodeDetails = getNodeDetails;
    window.IEKG.data.getNodeDetailsSync = getNodeDetailsSync;
})();
